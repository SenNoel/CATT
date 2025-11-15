import { Progress } from "./ui/progress";
import { Card } from "./ui/card";
import { Coffee, ShoppingCart, Tv, Car, Home, Utensils } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const spendingData = [
  { name: "Food", value: 450, color: "#3b82f6" },
  { name: "Rent", value: 1200, color: "#10b981" },
  { name: "Social", value: 180, color: "#f59e0b" },
  { name: "Transport", value: 220, color: "#8b5cf6" },
  { name: "Entertainment", value: 150, color: "#ec4899" },
];

const recentTransactions = [
  { id: 1, name: "Coffee Shop", amount: -4.50, category: "Food", date: "Oct 12", icon: Coffee },
  { id: 2, name: "Grocery Store", amount: -35.20, category: "Food", date: "Oct 11", icon: ShoppingCart },
  { id: 3, name: "Netflix", amount: -16.99, category: "Entertainment", date: "Oct 10", icon: Tv },
  { id: 4, name: "Uber", amount: -12.50, category: "Transport", date: "Oct 10", icon: Car },
  { id: 5, name: "Rent Payment", amount: -1200.00, category: "Rent", date: "Oct 1", icon: Home },
  { id: 6, name: "Restaurant", amount: -45.80, category: "Food", date: "Oct 9", icon: Utensils },
];

export function Dashboard() {
  const totalBudget = 3500;
  const totalSpent = spendingData.reduce((sum, item) => sum + item.value, 0);
  const remaining = totalBudget - totalSpent;
  const percentageRemaining = (remaining / totalBudget) * 100;

  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* Monthly Budget Remaining */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-100">
        <div className="space-y-4">
          <h2 className="text-muted-foreground">Monthly Budget Remaining</h2>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl">${remaining.toLocaleString()}</span>
              <span className="text-muted-foreground">of ${totalBudget.toLocaleString()}</span>
            </div>
            <Progress value={percentageRemaining} className="h-3" />
            <p className="text-muted-foreground">{percentageRemaining.toFixed(1)}% remaining</p>
          </div>
        </div>
      </Card>

      {/* Spending by Category */}
      <Card className="p-6">
        <h2 className="mb-4">Spending by Category</h2>
        
        <div className="flex flex-col items-center gap-6">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={spendingData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {spendingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full">
            {spendingData.map((category) => {
              const percentage = ((category.value / totalSpent) * 100).toFixed(1);
              return (
                <div key={category.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-muted-foreground truncate">
                    {category.name}
                  </span>
                  <span className="ml-auto">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-6">
        <h2 className="mb-4">Recent Transactions</h2>
        
        <div className="space-y-3">
          {recentTransactions.map((transaction) => {
            const Icon = transaction.icon;
            return (
              <div
                key={transaction.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate">{transaction.name}</p>
                  <p className="text-muted-foreground">{transaction.date}</p>
                </div>
                <span className="text-destructive">
                  ${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
