# IMPLEMENTATION.md

### Feature: Add Expense Form (Frontend UI)
Team Member: Chris Nguyen
* **Files:** 'AddExpense.js'

#### What the Code Does

This file is a **React component** that creates the "Add Expense" form for our user interface. This directly implements the UI design from our mockups and the "Manual Entry" user story. It uses React's `useState` hook to manage the data from the form's input fields (amount, category, date, etc.). When the user clicks "Save," it runs a `handleSave` function that validates the input and (eventually) will send this data to our Python backend API.

#### AI Generation Process

* **Why AI?** We had a Figma design exported as TypeScript (TS) code, but our project is using plain JavaScript (JS) and we didn't have the assumed UI libraries (`sonner`, `lucide-react`, etc.) installed. We used AI to translate the TS component into a functional JS component that uses standard HTML elements and no external dependencies.
* **Prompts:**
    1.  We first provided the TS code from Figma.
    2.  The AI generated a JS version, but we clarified that we did not have the `ui` folder or those libraries installed.
    3.  We then asked: `"Can you create a dependency-free version of this? It should use plain HTML and a simple alert() instead of toast()."`
* **Expectations & Modifications:** The first AI output was not usable because it still depended on the missing libraries. However, after we clarified our constraints, the AI-generated a second version that was good for now. It replaced all the custom components (`<Input>`, `<Card>`) with standard HTML (`<input>`, `<div>`) and inline CSS. This was good to obtain a basic functional component.

### Feature: Dashboard (Frontend UI)
Team Member: Albert Hu
* **Files:** 'Dashboard.js'

#### What the Code Does

This file is a **React component** that implements the main "Dashboard" view for our application. It displays three main sections:  
1. **Monthly Budget Remaining** – calculates total spent and remaining budget, displaying it with a simple progress bar.  
2. **Spending by Category** – shows a pie chart of expenses by category, along with percentages.  
3. **Recent Transactions** – lists recent expense entries with a small icon, name, date, and amount.  

The component does not rely on external charting or icon libraries; it uses plain **SVG** for the pie chart, **emojis** for icons, and basic `<div>` elements styled with inline CSS for layout and formatting. All calculations (totals, percentages, angles for pie slices) are performed in JavaScript within the component.

#### AI Generation Process

* **Why AI?** The original reference was a TypeScript React component using `recharts`, `lucide-react`, and custom UI components (`Card`, `Progress`). Our project does not include these libraries. AI was used to translate the TS component into a plain JavaScript React component with no external dependencies.  
* **Prompts:**
    1. Provided the original TS component that used external libraries.
    2. Asked AI to produce a JS version without TypeScript syntax.
    3. Clarified: `"Can you rewrite this so it has no library dependencies? Use plain HTML, inline CSS, emojis for icons, and SVG for the pie chart."`
* **Expectations & Modifications:** The AI-generated version replaced all custom and third-party components with standard HTML elements and inline styles. The pie chart is fully rendered using SVG paths, and the icons are replaced with simple emojis. This output is fully functional as a dependency-free React component and aligns with our project constraints.
