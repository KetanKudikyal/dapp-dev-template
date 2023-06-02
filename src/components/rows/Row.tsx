import React, { ComponentPropsWithRef } from 'react';

import clsxm from '@/lib/clsxm';

const Row: React.FC<
  ComponentPropsWithRef<'div'> & {
    isCentered?: boolean;
    isBetween?: boolean;
    direction?: 'row' | 'col';
  }
> = ({
  ref,
  className,
  children,
  isBetween,
  isCentered,
  direction = 'row',
  ...rest
}) => {
  return (
    <div
      ref={ref}
      className={clsxm(
        'flex h-fit w-full items-center items-center',
        [
          isCentered && 'justify-center',
          direction === 'col' ? 'flex-col' : 'flex-row',
          isBetween && 'justify-between',
        ],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Row;
