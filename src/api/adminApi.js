const API_URL = import.meta.env.VITE_BACKEND_URL;

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const adminApi = {
  login: (username, password) =>
    request("/admin/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  logout: () =>
    request("/admin/auth/logout", {
      method: "POST",
    }),

  me: () => request("/admin/auth/me"),

  overview: () => request("/admin/overview"),

  streamers: () => request("/admin/streamers"),

  streamer: (id) => request(`/admin/streamers/${id}`),

  tips: (page = 1, limit = 20, payment = "") =>
    request(
      `/admin/tips?page=${page}&limit=${limit}${
        payment !== "" ? `&payment=${payment}` : ""
      }`
    ),

    markPayoutPaid: (id, paymentReference = "") =>
  request(`/admin/payouts/${id}/pay`, {
    method: "PATCH",
    body: JSON.stringify({
      paymentReference,
    }),
  }),

  payouts: (month, year) =>
  request(`/admin/payouts?month=${month}&year=${year}`),
};

