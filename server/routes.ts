import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // ==========================================================================
  // GET /api/dashboard - Aggregated dashboard data
  // ==========================================================================
  app.get(api.dashboard.get.path, async (_req, res) => {
    try {
      const [engines, recentTransactions, forecasts, pendingActions, alerts] =
        await Promise.all([
          storage.getEngines(),
          storage.getTransactions(),
          storage.getForecasts(),
          storage.getPendingActions(),
          storage.getAlerts(),
        ]);

      res.json({
        engines,
        recentTransactions,
        forecasts,
        pendingActions,
        alerts,
      });
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // ==========================================================================
  // GET /api/engines - List all engines
  // ==========================================================================
  app.get(api.engines.list.path, async (_req, res) => {
    try {
      const engines = await storage.getEngines();
      res.json(engines);
    } catch (error) {
      console.error("Engines fetch error:", error);
      res.status(500).json({ message: "Failed to fetch engines" });
    }
  });

  // ==========================================================================
  // GET /api/engines/:id - Get single engine by ID
  // ==========================================================================
  app.get(api.engines.get.path, async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const engines = await storage.getEngines();
      const engine = engines.find((e) => e.id === id);
      if (!engine) {
        return res.status(404).json({ message: "Engine not found" });
      }
      res.json(engine);
    } catch (error) {
      console.error("Engine fetch error:", error);
      res.status(500).json({ message: "Failed to fetch engine" });
    }
  });

  // ==========================================================================
  // POST /api/actions/:id/execute - Execute a pending action
  // ==========================================================================
  app.post(api.actions.execute.path, async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const updated = await storage.executeAction(id);
      if (!updated) {
        return res.status(404).json({ message: "Action not found" });
      }
      res.json(updated);
    } catch (error) {
      console.error("Action execute error:", error);
      res.status(500).json({ message: "Failed to execute action" });
    }
  });

  // Seed database on startup
  await storage.seedData();

  return httpServer;
}
