import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.dashboard.get.path, async (req, res) => {
    const engines = await storage.getEngines();
    const recentTransactions = await storage.getTransactions();
    const forecasts = await storage.getForecasts();
    const pendingActions = await storage.getPendingActions();
    const alerts = await storage.getAlerts();

    res.json({
      engines,
      recentTransactions,
      forecasts,
      pendingActions,
      alerts
    });
  });

  app.get(api.engines.list.path, async (req, res) => {
    const engines = await storage.getEngines();
    res.json(engines);
  });

  app.get(api.engines.get.path, async (req, res) => {
    // In a real app this would find by ID, but we only have 3 engines
    // so we can just return one for now or mock it if we wanted proper ID support
    // For now returning the list is fine as the dashboard aggregates it
    res.status(501).json({ message: "Not implemented for single engine yet" });
  });

  app.post(api.actions.execute.path, async (req, res) => {
    const id = parseInt(req.params.id);
    const updated = await storage.executeAction(id);
    if (!updated) {
      return res.status(404).json({ message: "Action not found" });
    }
    res.json(updated);
  });

  // Seed data on startup
  await storage.seedData();

  return httpServer;
}
