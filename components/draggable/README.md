# Reusable Draggable System 🎯

A comprehensive, production-ready drag-and-drop system for Next.js applications using @dnd-kit. This system allows you to make any card component draggable with minimal setup.

## 🚀 Features

- **Global Drag Mode**: Single customize button controls all draggable sections
- **Multiple Containers**: Support for multiple independent draggable sections
- **Automatic State Management**: Handles save/cancel operations across all containers
- **LocalStorage Persistence**: Automatically saves and restores item orders
- **Flexible Layout Strategies**: Grid, vertical, and horizontal sorting strategies
- **Visual Feedback**: Drag indicators, borders, and smooth animations
- **Production Ready**: Clean separation of concerns, proper error handling

## 📦 Core Components

### 1. DragProvider
Context provider that manages global drag state.

```jsx
import { DragProvider } from '@/components/draggable/DragProvider';

<DragProvider>
  {/* Your app content */}
</DragProvider>
```

### 2. DragModeHeader
Header component with customize button and title.

```jsx
import { DragModeHeader } from '@/components/draggable/DragModeHeader';

<DragModeHeader
  title="Dashboard"
  description="Customize your dashboard layout"
>
  <DatePickerWithRange />
  <OtherHeaderComponents />
</DragModeHeader>
```

### 3. SortableContainer
Main component that makes any set of items draggable.

```jsx
import { SortableContainer } from '@/components/draggable/SortableContainer';

<SortableContainer
  containerId="unique-container-id"
  items={itemsArray}
  storageKey="localStorage-key"
  strategy="grid" // "vertical", "horizontal", "grid"
>
  {(items, SortableItem) => (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item, index) => SortableItem(item, index))}
    </div>
  )}
</SortableContainer>
```

### 4. DragConfirmationPopup
Confirmation popup for save/cancel operations.

```jsx
import { DragConfirmationPopup } from '@/components/draggable/DragModeHeader';

<DragConfirmationPopup />
```

## 🛠️ Implementation Guide

### Step 1: Prepare Your Data
Convert your static data to include IDs and components:

```jsx
const initialCards = [
  {
    id: "card-1",
    title: "Sales",
    value: "42,750",
    // ... other data
  },
  // ... more cards
];

// Convert to draggable format
const createCardComponents = (cardsData) => {
  return cardsData.map(cardData => ({
    id: cardData.id,
    component: <YourCard key={cardData.id} data={cardData} />
  }));
};
```

### Step 2: Create Your Card Component
Make your card responsive to drag mode:

```jsx
import { useDragContext } from '@/components/draggable/DragProvider';

const YourCard = ({ data }) => {
  const { isGlobalDragMode } = useDragContext();
  
  return (
    <div
      className={`
        bg-white rounded-lg p-4 transition-all duration-300
        ${isGlobalDragMode 
          ? "border-2 border-dashed border-gray-400" 
          : "hover:shadow-lg"
        }
      `}
    >
      {/* Drag mode indicator */}
      {isGlobalDragMode && (
        <div className="absolute top-2 left-2 opacity-60">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
      )}
      
      {/* Your card content */}
      <h3>{data.title}</h3>
      <p>{data.value}</p>
    </div>
  );
};
```

### Step 3: Implement in Your Page
Complete page implementation:

```jsx
"use client";
import React from "react";
import { 
  DragProvider, 
  DragModeHeader, 
  DragConfirmationPopup,
  SortableContainer 
} from '@/components/draggable';

const YourPage = () => {
  const cardComponents = createCardComponents(initialCards);

  return (
    <DragProvider>
      <div className="space-y-6">
        {/* Header with customize button */}
        <DragModeHeader
          title="Your Dashboard"
          description="Customize your dashboard layout"
        >
          <DatePicker />
        </DragModeHeader>

        {/* Draggable section */}
        <SortableContainer
          containerId="main-cards"
          items={cardComponents}
          storageKey="dashboard-cards-order"
          strategy="grid"
        >
          {(items, SortableItem) => (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {items.map((item, index) => SortableItem(item, index))}
            </div>
          )}
        </SortableContainer>

        {/* Multiple draggable sections */}
        <SortableContainer
          containerId="stats-cards"
          items={statsComponents}
          storageKey="dashboard-stats-order"
          strategy="grid"
        >
          {(items, SortableItem) => (
            <div className="grid grid-cols-4 gap-4">
              {items.map((item, index) => SortableItem(item, index))}
            </div>
          )}
        </SortableContainer>

        {/* Confirmation popup */}
        <DragConfirmationPopup />
      </div>
    </DragProvider>
  );
};
```

## 🎨 Customization Options

### Layout Strategies
- `"grid"`: Best for card layouts (default)
- `"vertical"`: For vertical lists
- `"horizontal"`: For horizontal lists

### Visual Customization
Add custom drag indicators and styling:

```jsx
const CustomCard = ({ data }) => {
  const { isGlobalDragMode } = useDragContext();
  
  return (
    <div className={cn(
      "bg-white rounded-lg p-4 transition-all duration-300",
      isGlobalDragMode && [
        "border-2 border-dashed border-blue-400",
        "hover:border-blue-600",
        "cursor-grab"
      ]
    )}>
      {/* Custom drag handle */}
      {isGlobalDragMode && (
        <div className="absolute top-2 right-2 p-1 bg-blue-100 rounded">
          <GripIcon className="w-4 h-4 text-blue-600" />
        </div>
      )}
      
      {/* Content */}
    </div>
  );
};
```

### Custom Drag Overlay
Customize the drag overlay:

```jsx
<SortableContainer
  containerId="cards"
  items={items}
  renderOverlay={(activeItem) => (
    <div className="transform scale-110 rotate-3 shadow-2xl">
      {activeItem.component}
    </div>
  )}
>
```

## 📱 Responsive Design

The system works seamlessly with responsive layouts:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {items.map((item, index) => SortableItem(item, index))}
</div>
```

## 💾 Data Persistence

Items are automatically saved to localStorage with the provided `storageKey`. To implement server-side persistence:

```jsx
const handleItemsChange = async (newItems) => {
  await saveToDatabase(newItems);
};

<SortableContainer
  containerId="cards"
  items={items}
  onItemsChange={handleItemsChange}
  // ...
>
```

## 🔧 Advanced Usage

### Multiple Independent Sections
Each container operates independently:

```jsx
<DragProvider>
  <SortableContainer containerId="section-1" /* ... */ />
  <SortableContainer containerId="section-2" /* ... */ />
  <SortableContainer containerId="section-3" /* ... */ />
  <DragConfirmationPopup />
</DragProvider>
```

### Conditional Dragging
Make sections conditionally draggable:

```jsx
const { isGlobalDragMode } = useDragContext();

{canEdit && isGlobalDragMode && (
  <SortableContainer /* ... */ />
)}
```

## 🎯 Real-world Examples

The system is already implemented in:
- `EcommerceCardsNew.jsx` - SMS dashboard cards
- `DraggableEcommerceStats.jsx` - Sales statistics
- `DraggableReportsArea.jsx` - Analytics reports

## 📋 Requirements

- Next.js 13+
- React 18+
- @dnd-kit/core
- @dnd-kit/sortable  
- @dnd-kit/utilities
- Tailwind CSS (for styling)

## 🚀 Getting Started

1. Copy the draggable components to your project
2. Install required dependencies
3. Follow the implementation guide above
4. Customize styling to match your design system

## 🎨 Styling

All components use Tailwind CSS classes and are fully customizable. The system includes:
- Smooth animations and transitions
- Visual drag indicators
- Responsive design patterns
- Accessible drag handles

---

*This system provides a production-ready foundation for implementing drag-and-drop functionality across your entire application with minimal setup and maximum flexibility.*
