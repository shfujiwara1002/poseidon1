import { db } from "./db";
import {
  engines, transactions, forecasts, actions, alerts,
  type Engine, type Transaction, type Forecast, type Action, type Alert
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getEngines(): Promise<Engine[]>;
  getTransactions(): Promise<Transaction[]>;
  getForecasts(): Promise<Forecast[]>;
  getPendingActions(): Promise<Action[]>;
  getAlerts(): Promise<Alert[]>;
  executeAction(id: number): Promise<Action | undefined>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getEngines(): Promise<Engine[]> {
    return await db.select().from(engines);
  }

  async getTransactions(): Promise<Transaction[]> {
    return await db.select().from(transactions).limit(10).orderBy(transactions.date);
  }

  async getForecasts(): Promise<Forecast[]> {
    return await db.select().from(forecasts).orderBy(forecasts.id);
  }

  async getPendingActions(): Promise<Action[]> {
    return await db.select().from(actions).where(eq(actions.status, "pending"));
  }

  async getAlerts(): Promise<Alert[]> {
    return await db.select().from(alerts).orderBy(alerts.timestamp);
  }

  async executeAction(id: number): Promise<Action | undefined> {
    const [updated] = await db.update(actions)
      .set({ status: "executed" })
      .where(eq(actions.id, id))
      .returning();
    return updated;
  }

  async seedData() {
    // Check if data exists
    const existingEngines = await this.getEngines();
    if (existingEngines.length > 0) return;

    // Seed Engines
    await db.insert(engines).values([
      { name: "Protect", status: "active", score: "0.02", metricLabel: "Threat Score", metricValue: "0.02%", details: "1,248 transactions scanned" },
      { name: "Grow", status: "active", score: "98.4", metricLabel: "Accuracy", metricValue: "98.4%", details: "$4,200 projected surplus" },
      { name: "Optimize", status: "optimizing", score: "408", metricLabel: "Pending Savings", metricValue: "$408/yr", details: "5 auto-actions pending" },
    ]);

    // Seed Transactions
    await db.insert(transactions).values([
      { merchant: "Uber Rides", amount: "24.50", status: "safe", riskScore: 5 },
      { merchant: "Netflix", amount: "15.99", status: "safe", riskScore: 2 },
      { merchant: "Unknown Vendor NYC", amount: "1250.00", status: "suspicious", riskScore: 88 },
      { merchant: "Whole Foods", amount: "84.20", status: "safe", riskScore: 3 },
      { merchant: "Steam Games", amount: "59.99", status: "safe", riskScore: 12 },
    ]);

    // Seed Forecasts
    await db.insert(forecasts).values([
      { month: "Jan", actual: "5000", projected: "5000", lowerBound: "4900", upperBound: "5100" },
      { month: "Feb", actual: "5200", projected: "5100", lowerBound: "5000", upperBound: "5300" },
      { month: "Mar", actual: "5100", projected: "5300", lowerBound: "5100", upperBound: "5500" },
      { month: "Apr", actual: null, projected: "5500", lowerBound: "5300", upperBound: "5800" },
      { month: "May", actual: null, projected: "5800", lowerBound: "5500", upperBound: "6100" },
      { month: "Jun", actual: null, projected: "6200", lowerBound: "5800", upperBound: "6500" },
    ]);

    // Seed Actions
    await db.insert(actions).values([
      { type: "subscription_cancel", description: "Cancel unused Gym Membership", amount: "45.00", status: "pending" },
      { type: "fund_transfer", description: "Move excess cash to HYSA", amount: "1200.00", status: "pending" },
      { type: "negotiation", description: "Negotiate Internet Bill", amount: "15.00", status: "pending" },
    ]);

    // Seed Alerts
    await db.insert(alerts).values([
      { title: "Subscription Price Hike", message: "Netflix increased by $2/mo", severity: "medium", read: false },
      { title: "Large Transaction Detected", message: "$1,250 at Unknown Vendor NYC", severity: "high", read: false },
    ]);
  }
}

export const storage = new DatabaseStorage();
