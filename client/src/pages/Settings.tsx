import { useState } from "react";
import { Layout } from "@/components/Layout";
import { cn } from "@/lib/utils";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Download,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  ChevronRight,
  LogOut,
  Trash2,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

type SettingsTab = "profile" | "notifications" | "security" | "billing" | "data";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [alertNotifications, setAlertNotifications] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "security" as const, label: "Security", icon: Shield },
    { id: "billing" as const, label: "Billing", icon: CreditCard },
    { id: "data" as const, label: "Data & Privacy", icon: Download },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl text-white mb-1 font-display font-bold">Settings</h1>
          <p className="text-slate-400 text-sm">Manage your account preferences</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400">
            <Check size={16} />
            <span className="text-sm font-medium">Settings saved</span>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="glass-card p-2 rounded-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left",
                  activeTab === tab.id
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <tab.icon size={18} />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <>
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-6">Profile Information</h3>

                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white">
                    AC
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors">
                      Change Avatar
                    </button>
                    <p className="text-slate-500 text-xs mt-2">JPG, PNG or GIF. Max 2MB</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="Alex"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Chen"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-slate-400 text-sm mb-2">Email Address</label>
                    <input
                      type="email"
                      defaultValue="alex.chen@example.com"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-slate-400 text-sm mb-2">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-6">Appearance</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {darkMode ? <Moon size={20} className="text-slate-400" /> : <Sun size={20} className="text-yellow-400" />}
                    <div>
                      <p className="text-white font-medium">Dark Mode</p>
                      <p className="text-slate-500 text-sm">Use dark theme across the app</p>
                    </div>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
              </div>

              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                Save Changes
              </button>
            </>
          )}

          {/* Notifications Settings */}
          {activeTab === "notifications" && (
            <>
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-6">Notification Preferences</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail size={20} className="text-slate-400" />
                      <div>
                        <p className="text-white font-medium">Email Notifications</p>
                        <p className="text-slate-500 text-sm">Receive updates via email</p>
                      </div>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone size={20} className="text-slate-400" />
                      <div>
                        <p className="text-white font-medium">Push Notifications</p>
                        <p className="text-slate-500 text-sm">Receive push notifications on your device</p>
                      </div>
                    </div>
                    <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell size={20} className="text-slate-400" />
                      <div>
                        <p className="text-white font-medium">Security Alerts</p>
                        <p className="text-slate-500 text-sm">Get notified about suspicious activity</p>
                      </div>
                    </div>
                    <Switch checked={alertNotifications} onCheckedChange={setAlertNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Download size={20} className="text-slate-400" />
                      <div>
                        <p className="text-white font-medium">Weekly Report</p>
                        <p className="text-slate-500 text-sm">Receive weekly financial summary</p>
                      </div>
                    </div>
                    <Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                Save Changes
              </button>
            </>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <>
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-6">Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-colors pr-12"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-6">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock size={20} className="text-slate-400" />
                    <div>
                      <p className="text-white font-medium">Enable 2FA</p>
                      <p className="text-slate-500 text-sm">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                </div>
                {twoFactor && (
                  <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                    <p className="text-cyan-400 text-sm">
                      Two-factor authentication is enabled. You'll need to enter a code from your authenticator app when signing in.
                    </p>
                  </div>
                )}
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <Smartphone size={20} className="text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">MacBook Pro - Chrome</p>
                        <p className="text-slate-500 text-xs">San Francisco, CA • Active now</p>
                      </div>
                    </div>
                    <span className="text-emerald-400 text-xs font-medium">Current</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                        <Smartphone size={20} className="text-slate-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">iPhone 15 Pro - Safari</p>
                        <p className="text-slate-500 text-xs">San Francisco, CA • 2 hours ago</p>
                      </div>
                    </div>
                    <button className="text-red-400 text-xs font-medium hover:text-red-300">Revoke</button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                Save Changes
              </button>
            </>
          )}

          {/* Billing Settings */}
          {activeTab === "billing" && (
            <>
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Current Plan</h3>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-medium rounded-full">
                    Pro Plan
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-white">$19</span>
                  <span className="text-slate-400">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-slate-300 text-sm">
                    <Check size={16} className="text-emerald-400" /> Unlimited transactions
                  </li>
                  <li className="flex items-center gap-2 text-slate-300 text-sm">
                    <Check size={16} className="text-emerald-400" /> Advanced fraud detection
                  </li>
                  <li className="flex items-center gap-2 text-slate-300 text-sm">
                    <Check size={16} className="text-emerald-400" /> AI-powered forecasting
                  </li>
                  <li className="flex items-center gap-2 text-slate-300 text-sm">
                    <Check size={16} className="text-emerald-400" /> Priority support
                  </li>
                </ul>
                <button className="w-full px-4 py-3 border border-white/10 rounded-lg text-white font-medium hover:bg-white/5 transition-colors">
                  Upgrade to Enterprise
                </button>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-6">Payment Method</h3>
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="text-white font-medium">•••• •••• •••• 4242</p>
                      <p className="text-slate-500 text-xs">Expires 12/25</p>
                    </div>
                  </div>
                  <button className="text-cyan-400 text-sm font-medium hover:text-cyan-300">
                    Edit
                  </button>
                </div>
                <button className="mt-4 text-slate-400 text-sm hover:text-white flex items-center gap-2">
                  <CreditCard size={16} />
                  Add new payment method
                </button>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-6">Billing History</h3>
                <div className="space-y-3">
                  {[
                    { date: "Jan 1, 2024", amount: "$19.00", status: "Paid" },
                    { date: "Dec 1, 2023", amount: "$19.00", status: "Paid" },
                    { date: "Nov 1, 2023", amount: "$19.00", status: "Paid" },
                  ].map((invoice, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{invoice.date}</p>
                        <p className="text-slate-500 text-xs">Pro Plan - Monthly</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-white font-mono">{invoice.amount}</span>
                        <span className="text-emerald-400 text-xs font-medium">{invoice.status}</span>
                        <ChevronRight size={16} className="text-slate-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Data & Privacy Settings */}
          {activeTab === "data" && (
            <>
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-6">Export Your Data</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Download a copy of all your data including transactions, forecasts, and account information.
                </p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2">
                    <Download size={16} />
                    Export as CSV
                  </button>
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2">
                    <Download size={16} />
                    Export as JSON
                  </button>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-6">Connected Accounts</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 font-bold">
                        B
                      </div>
                      <div>
                        <p className="text-white font-medium">Bank of America</p>
                        <p className="text-slate-500 text-xs">Connected on Jan 15, 2024</p>
                      </div>
                    </div>
                    <button className="text-red-400 text-sm font-medium hover:text-red-300">
                      Disconnect
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 font-bold">
                        C
                      </div>
                      <div>
                        <p className="text-white font-medium">Chase</p>
                        <p className="text-slate-500 text-xs">Connected on Jan 10, 2024</p>
                      </div>
                    </div>
                    <button className="text-red-400 text-sm font-medium hover:text-red-300">
                      Disconnect
                    </button>
                  </div>
                </div>
                <button className="mt-4 text-cyan-400 text-sm font-medium hover:text-cyan-300 flex items-center gap-2">
                  + Connect new account
                </button>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
                <h3 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium transition-colors flex items-center gap-2">
                    <LogOut size={16} />
                    Sign out all devices
                  </button>
                  <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium transition-colors flex items-center gap-2">
                    <Trash2 size={16} />
                    Delete account
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
