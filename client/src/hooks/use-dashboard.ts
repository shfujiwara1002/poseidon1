import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// GET /api/dashboard
export function useDashboardData() {
  return useQuery({
    queryKey: [api.dashboard.get.path],
    queryFn: async () => {
      const res = await fetch(api.dashboard.get.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch dashboard data");
      return api.dashboard.get.responses[200].parse(await res.json());
    },
    // Refresh frequently for "live" feel
    refetchInterval: 5000, 
  });
}

// GET /api/engines (Individual list if needed, though dashboard covers it)
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

// POST /api/actions/:id/execute
export function useExecuteAction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.actions.execute.path, { id });
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
    },
    onSuccess: () => {
      // Invalidate dashboard to refresh pending actions list and engine status
      queryClient.invalidateQueries({ queryKey: [api.dashboard.get.path] });
    },
  });
}
