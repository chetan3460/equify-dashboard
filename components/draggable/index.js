// Main draggable system exports
export { DragProvider, useDragContext } from './DragProvider';
export { SortableContainer } from './SortableContainer';
export { DragModeHeader, DragConfirmationPopup } from './DragModeHeader';

// Usage Example:
/*
import { DragProvider, DragModeHeader, DragConfirmationPopup, SortableContainer } from '@/components/draggable';

// Wrap your app/page with DragProvider
<DragProvider>
  <DragModeHeader title="Dashboard" description="Customize your dashboard">
    <OtherHeaderComponents />
  </DragModeHeader>
  
  <SortableContainer
    containerId="my-cards"
    items={cardComponents}
    storageKey="my-cards-order"
    strategy="grid"
  >
    {(items, SortableItem) => (
      <div className="grid grid-cols-3 gap-4">
        {items.map((item, index) => SortableItem(item, index))}
      </div>
    )}
  </SortableContainer>
  
  <DragConfirmationPopup />
</DragProvider>
*/
