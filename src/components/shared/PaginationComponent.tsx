import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function numberToArray(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i + 1);
}

export function PaginationComponent({
  totalElements,
  pageSize,
  page,
  setPage,
}: {
  totalElements: number;
  page: number;
  pageSize: number;
  setPage: (arg: number) => void;
}) {
  const totalPageNumber = Math.ceil(totalElements / pageSize);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href=""
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          />
        </PaginationItem>

        {numberToArray(totalPageNumber).map((index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href=""
              onClick={(e) => {
                e.preventDefault();
                setPage(index);
              }}
              // Optionnel : indique la page active
              isActive={index === page}
            >
              {index}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href=""
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPageNumber) {
                setPage(page + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
