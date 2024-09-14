/** @format */

export function convertDate(dateString: string) {
  // Check if dateString is defined and is a string
  const parsedDate = new Date(dateString);
  let convertedDate;

  if (!isNaN(parsedDate.getTime())) {
    // Check if the date is valid
    const movieYear = parsedDate.getFullYear();

    return movieYear; // Output: 2023
  } else {
    // console.log("Invalid date string");
  }
}

export function convertToHoursAndMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60); // Get the whole number of hours
  const mins = minutes % 60;              // Get the remaining minutes

  return `${hours}hr ${mins}mins`;
}

interface PaginationResult {
  startPage: number;
  endPage: number;
  pagesToShow: number[];
}

export function getPaginationPages(
  totalPages: number, // Total number of pages (e.g., 4000)
  activePage: number, // Current active page
  showBefore: number = 5, // Pages to show before the active page
  showAfter: number = 5 // Pages to show after the active page
): PaginationResult {
  // Calculate the start and end page numbers
  let startPage = Math.max(activePage - showBefore, 1);
  let endPage = Math.min(activePage + showAfter, totalPages);

  // Generate the page numbers to display
  const pagesToShow = [];
  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i);
  }

  return { startPage, endPage, pagesToShow };
}

export function modTitle(title: string) {
  return title.replace(/\s+/g, "_");
}

// // Example usage:
// const totalPages = 4000; // Total number of pages
// const activePage = 50; // Example of an active page (change this dynamically)

// const pagination = getPaginationPages(totalPages, activePage);

// console.log("Start Page:", pagination.startPage); // e.g. 45
// console.log("End Page:", pagination.endPage); // e.g. 55
// console.log("Pages to Show:", pagination.pagesToShow); // e.g. [45, 46, 47, ..., 55]
