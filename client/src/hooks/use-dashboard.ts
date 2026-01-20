import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, DashboardResponse } from "@shared/routes";
import type { Action } from "@shared/schema";

// =============================================================================
// MOCK DATA - Used when backend is unavailable (frontend-only development)
// =============================================================================

const merchants = [
  { name: "Amazon", safe: true },
  { name: "Spotify", safe: true },
  { name: "Netflix", safe: true },
  { name: "Uber Eats", safe: true },
  { name: "Apple Store", safe: true },
  { name: "Starbucks", safe: true },
  { name: "Gas Station", safe: true },
  { name: "Target", safe: true },
  { name: "Walmart", safe: true },
  { name: "Costco", safe: true },
  { name: "Whole Foods", safe: true },
  { name: "Home Depot", safe: true },
  { name: "Best Buy", safe: true },
  { name: "Walgreens", safe: true },
  { name: "CVS Pharmacy", safe: true },
  { name: "McDonald's", safe: true },
  { name: "Chipotle", safe: true },
  { name: "Gym Membership", safe: true },
  { name: "Electric Bill", safe: true },
  { name: "Phone Bill", safe: true },
  { name: "Internet Bill", safe: true },
  { name: "Water Bill", safe: true },
  { name: "Insurance Payment", safe: true },
  { name: "Gas Bill", safe: true },
  { name: "Grocery Store", safe: true },
  { name: "Restaurant - Downtown", safe: true },
  { name: "Coffee Shop", safe: true },
  { name: "Bookstore", safe: true },
  { name: "Movie Theater", safe: true },
  { name: "Parking Garage", safe: true },
  { name: "Unknown Vendor", safe: false },
  { name: "Foreign Transaction - Nigeria", safe: false },
  { name: "Suspicious ATM Withdrawal", safe: false },
  { name: "Online Casino", safe: false },
  { name: "Crypto Exchange", safe: false },
  { name: "Unusual Wire Transfer", safe: false },
  { name: "Overseas Purchase - Russia", safe: false },
  { name: "Night Club - 3AM", safe: false },
  { name: "Pawn Shop", safe: false },
  { name: "Unknown Online Store", safe: false },
];

function generateMockTransactions() {
  const transactions = [];
  const now = Date.now();
  const dayMs = 86400000;

  for (let i = 1; i <= 100; i++) {
    const merchant = merchants[Math.floor(Math.random() * merchants.length)];
    const isSuspicious = !merchant.safe;
    const amount = isSuspicious
      ? (Math.random() * 2000 + 100).toFixed(2)
      : (Math.random() * 300 + 5).toFixed(2);
    const riskScore = isSuspicious
      ? Math.floor(Math.random() * 30 + 70)
      : Math.floor(Math.random() * 20 + 1);
    const daysAgo = Math.floor(Math.random() * 30);

    transactions.push({
      id: i,
      merchant: merchant.name,
      amount,
      date: new Date(now - dayMs * daysAgo),
      status: isSuspicious ? "suspicious" : "safe",
      riskScore,
    });
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const mockDashboardData: DashboardResponse = {
  engines: [
    {
      id: 1,
      name: "Protect",
      status: "active",
      score: "0.02",
      metricLabel: "Threat Score",
      metricValue: "0.02%",
      details: "1,248 transactions scanned",
      lastUpdated: new Date(),
    },
    {
      id: 2,
      name: "Grow",
      status: "active",
      score: "98.4",
      metricLabel: "Accuracy",
      metricValue: "98.4%",
      details: "$4,200 projected surplus",
      lastUpdated: new Date(),
    },
    {
      id: 3,
      name: "Optimize",
      status: "optimizing",
      score: "408",
      metricLabel: "Pending Savings",
      metricValue: "$408/yr",
      details: "3 optimizations available",
      lastUpdated: new Date(),
    },
  ],
  recentTransactions: generateMockTransactions(),
  forecasts: [
    { id: 1, month: "Jan", actual: "45000", projected: "45000", lowerBound: "43000", upperBound: "47000" },
    { id: 2, month: "Feb", actual: "47200", projected: "47200", lowerBound: "45000", upperBound: "49400" },
    { id: 3, month: "Mar", actual: null, projected: "49800", lowerBound: "47500", upperBound: "52100" },
    { id: 4, month: "Apr", actual: null, projected: "52100", lowerBound: "49500", upperBound: "54700" },
    { id: 5, month: "May", actual: null, projected: "54800", lowerBound: "52000", upperBound: "57600" },
    { id: 6, month: "Jun", actual: null, projected: "57200", lowerBound: "54200", upperBound: "60200" },
  ],
  pendingActions: [
    { id: 1, type: "subscription_cancel", description: "Cancel unused Hulu subscription", amount: "17.99", status: "pending", date: new Date() },
    { id: 2, type: "fund_transfer", description: "Move $500 to high-yield savings", amount: "500.00", status: "pending", date: new Date() },
    { id: 3, type: "subscription_cancel", description: "Downgrade cloud storage plan", amount: "5.00", status: "pending", date: new Date() },
  ],
  alerts: [
    { id: 1, title: "Unusual Login Attempt", message: "New login detected from San Francisco, CA. If this wasn't you, please review your account security.", severity: "medium", read: false, timestamp: new Date() },
    { id: 2, title: "Large Transaction Flagged", message: "$299.00 charge from Unknown Vendor requires your review.", severity: "high", read: false, timestamp: new Date() },
  ],
};

// =============================================================================
// REACT QUERY HOOKS
// =============================================================================

/**
 * GET /api/dashboard - Fetches aggregated dashboard data
 * Falls back to mock data when backend is unavailable
 */
export function useDashboardData() {
  return useQuery({
    queryKey: [api.dashboard.get.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.dashboard.get.path, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        return api.dashboard.get.responses[200].parse(await res.json());
      } catch {
        console.info("Using mock dashboard data (backend unavailable)");
        return mockDashboardData;
      }
    },
    refetchInterval: 5000,
  });
}

/**
 * GET /api/engines - Fetches list of all engines
 */
export function useEngines() {
  return useQuery({
    queryKey: [api.engines.list.path],
    queryFn: async () => {
      const res = await fetch(api.engines.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch engines");
      return api.engines.list.responses[200].parse(await res.json());
    },
  });
}

/**
 * POST /api/actions/:id/execute - Executes a pending action
 * Uses optimistic updates and falls back to local state when backend is unavailable
 */
export function useExecuteAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<Action> => {
      const url = buildUrl(api.actions.execute.path, { id });

      try {
        const res = await fetch(url, {
          method: api.actions.execute.method,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) {
          if (res.status === 404) throw new Error("Action not found");
          throw new Error("Failed to execute action");
        }
        return api.actions.execute.responses[200].parse(await res.json());
      } catch {
        // Backend unavailable - simulate execution locally
        console.info("Executing action locally (backend unavailable)");

        // Get current data and find the action
        const currentData = queryClient.getQueryData<DashboardResponse>([api.dashboard.get.path]);
        const action = currentData?.pendingActions.find((a) => a.id === id);

        if (!action) {
          throw new Error("Action not found");
        }

        // Return the action with updated status
        return { ...action, status: "executed" } as Action;
      }
    },

    // Optimistic update - immediately update UI before server responds
    onMutate: async (id: number) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: [api.dashboard.get.path] });

      // Snapshot previous value
      const previousData = queryClient.getQueryData<DashboardResponse>([api.dashboard.get.path]);

      // Optimistically update the cache
      if (previousData) {
        queryClient.setQueryData<DashboardResponse>([api.dashboard.get.path], {
          ...previousData,
          pendingActions: previousData.pendingActions.filter((a) => a.id !== id),
        });
      }

      return { previousData };
    },

    // Rollback on error
    onError: (_err, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([api.dashboard.get.path], context.previousData);
      }
    },

    // Refetch after success or error
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [api.dashboard.get.path] });
    },
  });
}
