import React from "react";

const spendingData = [
  { name: "Food", value: 450, color: "#3b82f6" },
  { name: "Rent", value: 1200, color: "#10b981" },
  { name: "Social", value: 180, color: "#f59e0b" },
  { name: "Transport", value: 220, color: "#8b5cf6" },
  { name: "Entertainment", value: 150, color: "#ec4899" },
];

const recentTransactions = [
  { id: 1, name: "Coffee Shop", amount: -4.50, category: "Food", date: "Oct 12", icon: "☕" },
  { id: 2, name: "Grocery Store", amount: -35.20, category: "Food", date: "Oct 11", icon: "🛒" },
  { id: 3, name: "Netflix", amount: -16.99, category: "Entertainment", date: "Oct 10", icon: "📺" },
  { id: 4, name: "Uber", amount: -12.50, category: "Transport", date: "Oct 10", icon: "🚗" },
  { id: 5, name: "Rent Payment", amount: -1200.00, category: "Rent", date: "Oct 1", icon: "🏠" },
  { id: 6, name: "Restaurant", amount: -45.80, category: "Food", date: "Oct 9", icon: "🍽️" },
];

export function Dashboard() {
  const totalBudget = 3500;
  const totalSpent = spendingData.reduce((sum, item) => sum + item.value, 0);
  const remaining = totalBudget - totalSpent;
  const percentageRemaining = (remaining / totalBudget) * 100;

  // Pie chart helper: calculate cumulative angles
  const cumulativeAngles = [];
  let angleSum = 0;
  spendingData.forEach(d => {
    cumulativeAngles.push(angleSum);
    angleSum += (d.value / totalSpent) * 360;
  });

  const renderPieSlices = () => {
    const radius = 80;
    const center = 100;
    return spendingData.map((d, i) => {
      const startAngle = cumulativeAngles[i];
      const endAngle = cumulativeAngles[i] + (d.value / totalSpent) * 360;

      const x1 = center + radius * Math.cos((Math.PI / 180) * startAngle);
      const y1 = center + radius * Math.sin((Math.PI / 180) * startAngle);
      const x2 = center + radius * Math.cos((Math.PI / 180) * endAngle);
      const y2 = center + radius * Math.sin((Math.PI / 180) * endAngle);
      const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

      const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      return <path key={d.name} d={pathData} fill={d.color} />;
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "80px" }}>
      
      {/* Monthly Budget Remaining */}
      <div style={{ padding: "24px", background: "#eff6ff", borderRadius: "8px", border: "1px solid #bfdbfe" }}>
        <h2 style={{ color: "#6b7280" }}>Monthly Budget Remaining</h2>
        <div style={{ marginTop: "8px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span style={{ fontSize: "2rem" }}>${remaining.toLocaleString()}</span>
            <span style={{ color: "#6b7280" }}>of ${totalBudget.toLocaleString()}</span>
          </div>
          <div style={{ height: "12px", background: "#e5e7eb", borderRadius: "6px", marginTop: "8px", overflow: "hidden" }}>
            <div style={{ width: `${percentageRemaining}%`, height: "100%", background: "#3b82f6" }}></div>
          </div>
          <p style={{ color: "#6b7280", marginTop: "4px" }}>{percentageRemaining.toFixed(1)}% remaining</p>
        </div>
      </div>

      {/* Spending by Category */}
      <div style={{ padding: "24px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
        <h2 style={{ marginBottom: "16px" }}>Spending by Category</h2>
        <svg width={200} height={200}>{renderPieSlices()}</svg>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "16px" }}>
          {spendingData.map(c => {
            const percentage = ((c.value / totalSpent) * 100).toFixed(1);
            return (
              <div key={c.name} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: c.color }}></div>
                <span style={{ color: "#6b7280", flex: 1 }}>{c.name}</span>
                <span>{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions */}
      <div style={{ padding: "24px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
        <h2 style={{ marginBottom: "16px" }}>Recent Transactions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {recentTransactions.map(t => (
            <div key={t.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", transition: "background 0.2s", cursor: "pointer" }}
                 onMouseEnter={e => e.currentTarget.style.background = "#f3f4f6"}
                 onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span>{t.icon}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.name}</p>
                <p style={{ color: "#6b7280" }}>{t.date}</p>
              </div>
              <span style={{ color: t.amount < 0 ? "#dc2626" : "#16a34a" }}>${Math.abs(t.amount).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
