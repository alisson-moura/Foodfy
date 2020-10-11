//paginação
function paginate(totalPages, selectedPage) {
  let pages = [],
    oldPage

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;

    if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
      if (oldPage && currentPage - oldPage >= 2) {
        pages.push("...");
      }
      if (oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1);
      }

      pages.push(currentPage);
      oldPage = currentPage;
    }
  }

  return pages;
}

const pagination = document.querySelector('.pagination');
if (pagination) {
  const page = Number(pagination.dataset.page);
  const total = Number(pagination.dataset.total);
  const filter = pagination.dataset.filter;
  const pages = paginate(total, page);

  let elementsList = "";
  for (let page of pages) {
    if (String(page).includes('...')) {
      elementsList += `<span>${page}</span>`;
    }
    else {
      if (filter) {
        elementsList += `<a href="?page=${page}&filter=${filter}" >${page}</a>`
      } else {
        elementsList += `<a href="?page=${page}">${page}</a>`
      }

    }
  }
  pagination.innerHTML = elementsList;
}

function queryObject(){
  let result = {}, keyValuePairs = location.search.slice(1).split('&');
  keyValuePairs.forEach(function(keyValuePair) {
    keyValuePair = keyValuePair.split('=');
    result[decodeURIComponent(keyValuePair[0])] = decodeURIComponent(keyValuePair[1]) || '';
  });
  return result;
}

let params = queryObject();
const pageCurrent = params.page || 1;
const pages = document.querySelectorAll('.pagination a');
for (const page of pages) {
  let pageIndex = page.firstChild.data || 1;
  if(pageCurrent == pageIndex ){
    page.classList.add('active');
  }
}
