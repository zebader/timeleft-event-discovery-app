import { useAtom } from 'jotai';
import { useCallback } from 'react';

import type { Event } from '@/api/types';
import { FilterPicker } from '@/common/components/FilterPicker';
import { selectedCategoryAtom } from '@/common/data-access/atoms/category.atom';
import { useEventCategories } from '@/common/hooks';

import { capitalizeString } from '../utils/eventListCardUtils';

export const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const { data: categories = [], isPending } = useEventCategories();

  const handleSelectCategory = useCallback(
    (category: Event['type']) => {
      setSelectedCategory(category);
    },
    [setSelectedCategory],
  );

  return (
    <FilterPicker
      selectedLabel={capitalizeString(selectedCategory)}
      accessibilityLabel={`Selected category: ${selectedCategory}. Tap to change.`}
      sheetTitle="Category"
      backdropAccessibilityLabel="Close category picker"
      data={categories}
      keyExtractor={(item) => item}
      getItemLabel={capitalizeString}
      onSelect={handleSelectCategory}
      isPending={isPending}
      emptyLabel="No categories available"
    />
  );
};
