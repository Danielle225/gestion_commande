import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './inventory.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  // Ajouter du stock après une livraison
  async addStock(id: number, quantity: number): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({
      where: { id: id },
    });
    inventory.stockLevel += quantity;
    inventory.lastUpdated = new Date().toISOString();
    return this.inventoryRepository.save(inventory);
  }

  // Déduire du stock après une commande
  async reduceStock(id: number, quantity: number): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({
      where: { id: id },
    });
    if (inventory.stockLevel < quantity) {
      throw new Error('Stock insuffisant');
    }
    inventory.stockLevel -= quantity;
    inventory.lastUpdated = new Date().toISOString();
    return this.inventoryRepository.save(inventory);
  }

  // Récupérer un inventaire
  async findOne(id: number): Promise<Inventory> {
    return this.inventoryRepository.findOne({
      where: { id: id },
    });
  }

  // Vérifier les stocks faibles (par exemple, égal ou inférieur à 0)
  async checkLowStock(): Promise<Inventory[]> {
    return this.inventoryRepository.find({
      where: { stockLevel: 0 },
      relations: ['product'],
    });
  }

  // Envoi des alertes de stock faible
  async sendLowStockAlerts(): Promise<void> {
    const lowStockItems = await this.checkLowStock();
    lowStockItems.forEach((item) => {
      console.log(
        `ALERTE : Le stock du produit ${item.product.name} est faible (${item.stockLevel}).`,
      );
    });
  }

  // Planifier des alertes de stock faible tous les jours à minuit
  @Cron('0 0 * * *') // Tous les jours à minuit
  async scheduledLowStockAlerts() {
    await this.sendLowStockAlerts();
  }

  // Créer un inventaire
  async create(inventory: Inventory): Promise<Inventory> {
    return this.inventoryRepository.save(inventory);
  }

  // Récupérer tous les inventaires
  async findAll(): Promise<Inventory[]> {
    return this.inventoryRepository.find({ relations: ['product'] });
  }

  // Mettre à jour le stock
  async updateStock(id: number, stockLevel: number): Promise<any> {
    return this.inventoryRepository.update(id, {
      stockLevel,
      lastUpdated: new Date().toISOString(),
    });
  }
}
