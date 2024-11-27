import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.entity';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  // Créer un inventaire
  @Post()
  create(@Body() inventory: Inventory) {
    return this.inventoryService.create(inventory);
  }

  // Récupérer tous les stocks
  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  // Ajouter du stock après une livraison
  @Put(':id/add-stock')
  addStock(@Param('id') id: number, @Body('quantity') quantity: number) {
    return this.inventoryService.addStock(id, quantity);
  }

  // Déduire du stock après une commande
  @Put(':id/reduce-stock')
  reduceStock(@Param('id') id: number, @Body('quantity') quantity: number) {
    return this.inventoryService.reduceStock(id, quantity);
  }

  // Vérifier les produits en faible stock
  @Get('low-stock')
  checkLowStock() {
    return this.inventoryService.checkLowStock();
  }

  // Tester les alertes de stock faible manuellement
  @Get('test-alerts')
  testAlerts() {
    return this.inventoryService.sendLowStockAlerts();
  }
}
