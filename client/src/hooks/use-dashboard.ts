/**
 * Dashboard Hooks
 * React Query hooks for dashboard data fetching and mutations
 * @see specs/hooks/use-dashboard.spec.ts
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, DashboardResponse, ActionResponse } from "@shared/routes";

// =============================================================================
// MOCK DATA GENERATORS - Used when backend is unavailable (frontend-only dev)
// =============================================================================

const MERCHANT_DATA = {
  safe: [
    "Amazon", "Spotify", "Netflix", "Uber Eats", "Apple Store",
    "Starbucks", "Gas Station", "Target", "Walmart", "Costco",
    "Whole Foods", "Home Depot", "Best Buy", "Walgreens", "CVS Pharmacy",
    "McDonald's", "Chipotle", "Gym Membership", "Electric Bill", "Phone Bill",
    "Internet Bill", "Water Bill", "Insurance Payment", "Gas Bill", "Grocery Store",
    "Restaurant - Downtown", "Coffee Shop", "Bookstore", "Movie Theater", "Parking Garage",
  ],
  suspicious: [
    "Unknown Vendor", "Foreign Transaction - Nigeria", "Suspicious ATM Withdrawal",
    "Online Casino", "Crypto Exchange", "Unusual Wire Transfer",
    "Overseas Purchase - Russia", "Night Club - 3AM", "Pawn Shop", "Unknown Online Store",
  ],
};

type RiskFlag = 'none' | 'low' | 'medium' | 'high' | 'critical';

function getRiskFlag(riskScore: number): RiskFlag {
  if (riskScore <= 10) return 'none';
  if (riskScore <= 30) return 'low';
  if (riskScore <= 60) return 'medium';
  if (riskScore <= 80) return 'high';
  return 'critical';
}

function generateMockTransactions() {
  const transactions = [];
  const now = Date.now();
  const dayMs = 86400000;

  for (let i = 1; i <= 100; i++) {
    const isSuspicious = Math.random() < 0.15; // 15% suspicious rate
    const merchantList = isSuspicious ? MERCHANT_DATA.suspicious : MERCHANT_DATA.safe;
    const merchant = merchantList[Math.floor(Math.random() * merchantList.length)];

    const amount = isSuspicious
      ? (Math.random() * 2000 + 100).toFixed(2)
      : (Math.random() * 300 + 5).toFixed(2);

    const riskScore = isSuspicious
      ? Math.floor(Math.random() * 30 + 70)
      : Math.floor(Math.random() * 20 + 1);

    const daysAgo = Math.floor(Math.random() * 30);

    transactions.push({
      id: i,
      merchant,
      amount,
      date: new Date(now - dayMs * daysAgo),
      status: isSuspicious ? "suspicious" : "safe",
      riskScore,
      riskFlag: getRiskFlag(riskScore),
    });
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// =============================================================================
// MOCK DASHBOARD DATA
// =============================================================================

const mockDashboardData: DashboardResponse = {
  engines: [
    {
      id: 1,
      name: "Protect",
      type: "protect",
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
      type: "grow",
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
      type: "optimize",
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
    {
      id: 1,
      type: "subscription_cancel",
      description: "Cancel unused Hulu subscription",
      amount: "17.99",
      status: "pending",
      date: new Date(),
    },
    {
      id: 2,
      type: "fund_transfer",
      description: "Move $500 to high-yield savings",
      amount: "500.00",
      status: "pending",
      date: new Date(),
    },
    {
      id: 3,
      type: "subscription_cancel",
      description: "Downgrade cloud storage plan",
      amount: "5.00",
      status: "pending",
      date: new Date(),
    },
  ],
  alerts: [
    {
      id: 1,
      title: "Unusual Login Attempt",
      message: "New login detected from San Francisco, CA. If this wasn't you, please review your account security.",
      severity: "medium",
      read: false,
      timestamp: new Date(),
    },
    {
      id: 2,
      title: "Large Transaction Flagged",
      message: "$299.00 charge from Unknown Vendor requires your review.",
      severity: "high",
      read: false,
      timestamp: new Date(),
    },
  ],
};

// =============================================================================
// REACT QUERY HOOKS
// =============================================================================

/**
 * GET /api/dashboard - Fetches aggregated dashboard data
 * Falls back to mock data when backend is unavailable
 * @see specs/hooks/use-dashboard.spec.ts
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
    mutationFn: async (id: number): Promise<ActionResponse> => {
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
        return { ...action, status: "executed" };
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

/**
 * Hook for approving/rejecting optimizations
 * @see specs/hooks/use-optimizations.spec.ts
 */
export function useOptimizationActions() {
  const queryClient = useQueryClient();

  const approve = useMutation({
    mutationFn: async (id: string) => {
      console.info(`Approving optimization ${id}`);
      // In a real app, this would call the API
      return { id, status: "approved" };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.dashboard.get.path] });
    },
  });

  const reject = useMutation({
    mutationFn: async (id: string) => {
      console.info(`Rejecting optimization ${id}`);
      return { id, status: "rejected" };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.dashboard.get.path] });
    },
  });

  return { approve, reject };
}

/**
 * Hook for acknowledging/dismissing alerts
 * @see specs/hooks/use-alerts.spec.ts
 */
export function useAlertActions() {
  const queryClient = useQueryClient();

  const acknowledge = useMutation({
    mutationFn: async (id: string) => {
      console.info(`Acknowledging alert ${id}`);
      return { id, acknowledged: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.dashboard.get.path] });
    },
  });

  const dismiss = useMutation({
    mutationFn: async (id: string) => {
      console.info(`Dismissing alert ${id}`);
      return { id, dismissed: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.dashboard.get.path] });
    },
  });

  return { acknowledge, dismiss };
}
