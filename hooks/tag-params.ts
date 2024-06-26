'use client';

import { TagId, mainTags } from '@/data/tag';
import { useSearchParams } from 'next/navigation';

export const useTagParams = () => {
  const tags = (useSearchParams().get('tags')?.split(',').filter(Boolean) ??
    []) as TagId[];

  const addTagToSearchParmas = (tag: TagId, keepMainTag?: boolean) => {
    const src = keepMainTag
      ? tags
      : tags.filter((t: TagId) => !mainTags.includes(t));

    if (src.includes(tag)) {
      return src.join(',');
    } else {
      return [...src, tag].join(',');
    }
  };

  const removeTagToSearchParmas = (tag: TagId) => {
    return tags.filter((t: TagId) => t !== tag).join(',');
  };

  return { tags, addTagToSearchParmas, removeTagToSearchParmas };
};
