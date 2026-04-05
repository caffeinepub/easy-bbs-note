import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Clock,
  Database,
  Loader2,
  LogOut,
  RotateCcw,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { ContributorRequest } from "../backend.d";
import { ContributorStatus } from "../backend.d";
import {
  useAllContributorRequests,
  useSeedData,
  useUpdateContributorStatus,
} from "../hooks/useQueries";

// ─────────────────────────────────────────────
// Types & helpers
// ─────────────────────────────────────────────

type StatusKey = "pending" | "approved" | "rejected";

function getStatusKey(status: ContributorStatus): StatusKey {
  const s = status as any;
  if (typeof s === "object" && s !== null) {
    if ("approved" in s) return "approved";
    if ("rejected" in s) return "rejected";
    return "pending";
  }
  if (s === ContributorStatus.approved) return "approved";
  if (s === ContributorStatus.rejected) return "rejected";
  return "pending";
}

function toContributorStatus(key: StatusKey): ContributorStatus {
  if (key === "approved") return { approved: null } as any as ContributorStatus;
  if (key === "rejected") return { rejected: null } as any as ContributorStatus;
  return { pending: null } as any as ContributorStatus;
}

// ─────────────────────────────────────────────
// Credentials
// ─────────────────────────────────────────────

const ADMIN_USERNAME = "rowzan";
const ADMIN_PASSWORD = "newborn33";
const SESSION_KEY = "bbs_admin_auth";

// ─────────────────────────────────────────────
// Login Form
// ─────────────────────────────────────────────

function AdminLoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (
        username.trim().toLowerCase() === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
      ) {
        sessionStorage.setItem(SESSION_KEY, "true");
        onLogin();
        toast.success("Welcome back, Admin!");
      } else {
        setError("Incorrect username or password.");
      }
      setLoading(false);
    }, 400);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <Card className="shadow-lift border-border">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck size={28} className="text-primary" />
              </div>
            </div>
            <CardTitle className="text-center font-display text-2xl">
              Admin Access
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Sign in to manage contributor requests
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="admin-username">Username</Label>
                <Input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  autoComplete="username"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                  {error}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function formatDate(nanoseconds: bigint): string {
  const ms = Number(nanoseconds / 1_000_000n);
  if (ms === 0) return "—";
  return new Date(ms).toLocaleDateString("en-NP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StatusBadge({ status }: { status: ContributorStatus }) {
  const key = getStatusKey(status);
  if (key === "approved")
    return (
      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
        <CheckCircle size={11} className="mr-1" /> Approved
      </Badge>
    );
  if (key === "rejected")
    return (
      <Badge className="bg-red-100 text-red-700 border-red-200">
        <XCircle size={11} className="mr-1" /> Rejected
      </Badge>
    );
  return (
    <Badge className="bg-amber-100 text-amber-700 border-amber-200">
      <Clock size={11} className="mr-1" /> Pending
    </Badge>
  );
}

// ─────────────────────────────────────────────
// Request Row
// ─────────────────────────────────────────────

function RequestRow({
  req,
  index,
}: { req: ContributorRequest; index: number }) {
  const updateStatus = useUpdateContributorStatus();
  const statusKey = getStatusKey(req.status);

  function act(newStatusKey: StatusKey) {
    const label =
      newStatusKey === "approved"
        ? "approved"
        : newStatusKey === "rejected"
          ? "rejected"
          : "set to pending";
    updateStatus.mutate(
      { id: req.id, status: toContributorStatus(newStatusKey) },
      {
        onSuccess: () => toast.success(`Request ${label}.`),
        onError: () => toast.error("Action failed. Please try again."),
      },
    );
  }

  const isMutating = updateStatus.isPending;

  return (
    <tr
      className="border-b border-border hover:bg-muted/30 transition-colors"
      data-ocid={`admin.requests.row.${index}`}
    >
      <td className="px-4 py-3 text-sm font-medium text-foreground">
        {req.name}
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground max-w-[160px] truncate">
        {req.email}
      </td>
      <td className="px-4 py-3 text-sm text-foreground">{req.subject}</td>
      <td
        className="px-4 py-3 text-sm text-muted-foreground max-w-[200px] truncate"
        title={req.description}
      >
        {req.description}
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">
        {formatDate(req.createdAt)}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={req.status} />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {statusKey === "pending" && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-2.5 text-xs border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                disabled={isMutating}
                onClick={() => act("approved")}
                data-ocid={`admin.requests.approve_button.${index}`}
              >
                {isMutating ? (
                  <Loader2 size={11} className="animate-spin" />
                ) : (
                  <CheckCircle size={11} className="mr-1" />
                )}
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-2.5 text-xs border-red-300 text-red-700 hover:bg-red-50"
                disabled={isMutating}
                onClick={() => act("rejected")}
                data-ocid={`admin.requests.delete_button.${index}`}
              >
                {isMutating ? (
                  <Loader2 size={11} className="animate-spin" />
                ) : (
                  <XCircle size={11} className="mr-1" />
                )}
                Reject
              </Button>
            </>
          )}
          {(statusKey === "approved" || statusKey === "rejected") && (
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-2.5 text-xs"
              disabled={isMutating}
              onClick={() => act("pending")}
              data-ocid={`admin.requests.secondary_button.${index}`}
            >
              {isMutating ? (
                <Loader2 size={11} className="animate-spin" />
              ) : (
                <RotateCcw size={11} className="mr-1" />
              )}
              Set Pending
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}

// ─────────────────────────────────────────────
// Requests Table
// ─────────────────────────────────────────────

function RequestsTable({ requests }: { requests: ContributorRequest[] }) {
  if (requests.length === 0) {
    return (
      <div
        className="text-center py-16 text-muted-foreground"
        data-ocid="admin.requests.empty_state"
      >
        <Users size={40} className="mx-auto mb-3 opacity-30" />
        <p className="text-sm">No requests found in this category.</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto" data-ocid="admin.requests.table">
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            {[
              "Name",
              "Email",
              "Subject",
              "Description",
              "Date",
              "Status",
              "Actions",
            ].map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {requests.map((req, i) => (
            <RequestRow key={String(req.id)} req={req} index={i + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────
// Stats Card
// ─────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon,
  colorText,
  colorBg,
  loading,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  colorText: string;
  colorBg: string;
  loading: boolean;
}) {
  return (
    <Card className="border-border" data-ocid="admin.stats.card">
      <CardContent className="pt-5 pb-4 px-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {label}
            </p>
            {loading ? (
              <Skeleton className="h-8 w-12 mt-1" />
            ) : (
              <p className={`text-3xl font-bold mt-0.5 ${colorText}`}>
                {value}
              </p>
            )}
          </div>
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorBg}`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────
// Dashboard
// ─────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const {
    data: allRequests = [],
    isLoading,
    error,
  } = useAllContributorRequests();
  const seedData = useSeedData();

  const pending = allRequests.filter(
    (r) => getStatusKey(r.status) === "pending",
  );
  const approved = allRequests.filter(
    (r) => getStatusKey(r.status) === "approved",
  );
  const rejected = allRequests.filter(
    (r) => getStatusKey(r.status) === "rejected",
  );

  function handleSeed() {
    seedData.mutate(undefined, {
      onSuccess: () => toast.success("Sample data loaded successfully!"),
      onError: () => toast.error("Failed to load sample data."),
    });
  }

  return (
    <main
      className="min-h-screen bg-background"
      data-ocid="admin.dashboard.section"
    >
      <section className="bg-hero py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <ShieldCheck size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl text-foreground">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage contributor requests and site content
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleSeed}
                disabled={seedData.isPending}
                data-ocid="admin.seed.secondary_button"
              >
                {seedData.isPending ? (
                  <Loader2 size={13} className="mr-1.5 animate-spin" />
                ) : (
                  <Database size={13} className="mr-1.5" />
                )}
                Load Sample Data
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onLogout}
                data-ocid="admin.logout.secondary_button"
              >
                <LogOut size={13} className="mr-1.5" /> Logout
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            <StatCard
              label="Total Requests"
              value={allRequests.length}
              icon={<Users size={20} className="text-blue-600" />}
              colorText="text-blue-700"
              colorBg="bg-blue-100"
              loading={isLoading}
            />
            <StatCard
              label="Pending"
              value={pending.length}
              icon={<Clock size={20} className="text-amber-600" />}
              colorText="text-amber-700"
              colorBg="bg-amber-100"
              loading={isLoading}
            />
            <StatCard
              label="Approved"
              value={approved.length}
              icon={<CheckCircle size={20} className="text-emerald-600" />}
              colorText="text-emerald-700"
              colorBg="bg-emerald-100"
              loading={isLoading}
            />
            <StatCard
              label="Rejected"
              value={rejected.length}
              icon={<XCircle size={20} className="text-red-600" />}
              colorText="text-red-700"
              colorBg="bg-red-100"
              loading={isLoading}
            />
          </motion.div>

          {error && (
            <div
              className="p-4 rounded-lg border border-destructive/30 bg-destructive/5 text-destructive text-sm"
              data-ocid="admin.requests.error_state"
            >
              Failed to load contributor requests. Please refresh the page.
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Tabs defaultValue="pending" data-ocid="admin.requests.tab">
              <TabsList className="mb-4">
                <TabsTrigger value="pending" data-ocid="admin.pending.tab">
                  Pending
                  {pending.length > 0 && (
                    <span className="ml-1.5 text-xs bg-amber-100 text-amber-700 rounded-full px-1.5 py-0.5 font-semibold">
                      {pending.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="approved" data-ocid="admin.approved.tab">
                  Approved
                </TabsTrigger>
                <TabsTrigger value="rejected" data-ocid="admin.rejected.tab">
                  Rejected
                </TabsTrigger>
                <TabsTrigger value="all" data-ocid="admin.all.tab">
                  All
                </TabsTrigger>
              </TabsList>

              {isLoading ? (
                <div
                  className="space-y-3"
                  data-ocid="admin.requests.loading_state"
                >
                  {[1, 2, 3].map((n) => (
                    <Skeleton key={n} className="h-12 w-full rounded-lg" />
                  ))}
                </div>
              ) : (
                <>
                  <TabsContent value="pending">
                    <Card className="border-border overflow-hidden">
                      <RequestsTable requests={pending} />
                    </Card>
                  </TabsContent>
                  <TabsContent value="approved">
                    <Card className="border-border overflow-hidden">
                      <RequestsTable requests={approved} />
                    </Card>
                  </TabsContent>
                  <TabsContent value="rejected">
                    <Card className="border-border overflow-hidden">
                      <RequestsTable requests={rejected} />
                    </Card>
                  </TabsContent>
                  <TabsContent value="all">
                    <Card className="border-border overflow-hidden">
                      <RequestsTable requests={allRequests} />
                    </Card>
                  </TabsContent>
                </>
              )}
            </Tabs>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────

export function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  });

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAdmin(false);
  }

  if (!isAdmin) {
    return <AdminLoginForm onLogin={() => setIsAdmin(true)} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}
