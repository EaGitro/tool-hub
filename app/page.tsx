'use client';

import ItemCard from '@/components/item-card';
import { Button } from '@/components/ui/button';
import { allItems } from '@/data/item';
import { TagId } from '@/data/tag';
import { useTagParams } from '@/hooks/tag-params';
import { getTagLabel } from '@/lib/tag';
import Link from 'next/link';

export default function Page() {
  const { tags } = useTagParams();

  const currentItems = allItems.filter((item) => {
    if (!tags || tags?.length === 0) {
      return true;
    }

    return tags.every((tag) => item.tags.includes(tag as TagId));
  });

  if (currentItems.length === 0) {
    return (
      <div className="text-center space-y-4 my-10">
        <p className="text-sm text-muted-foreground text-center">
          {tags.length > 0
            ? '「' +
              tags.map((tag) => getTagLabel(tag)).join(', ') +
              '」のタグをもつアイテムは存在しません'
            : 'アイテムは存在しません'}
        </p>

        <Button variant="outline" size="sm" asChild>
          <Link href="/">タグをリセット</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
      {currentItems.map((item) => (
        <ItemCard
          key={item.title}
          id={item.id}
          href={item.href}
          title={item.title}
          tags={item.tags}
        />
      ))}
    </div>
  );
}
