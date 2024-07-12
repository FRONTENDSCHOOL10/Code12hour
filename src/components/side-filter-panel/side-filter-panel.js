import './side-filter-panel.scss';

//체크박스 버튼 카운트
document.addEventListener('DOMContentLoaded', function () {
  const updateCount = (detailsId) => {
    const details = document.getElementById(detailsId);
    const countSpan = details.querySelector('.header-count');
    const checkboxes = details.querySelectorAll('.filter-panel__category-input');
    let checkedCount = 0;
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        console.log(details);

        checkedCount++;
      }
    });
    countSpan.textContent = checkedCount;
  };

  document.querySelectorAll('.filter-panel__category-input').forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      const parentDetails = checkbox.closest('.filter-panel__category-list').id;
      updateCount(parentDetails);
    });
  });
});

// 라디오 버튼 카운트
document.querySelectorAll('.filter-panel__category-list').forEach(function (categoryList) {
  const inputs = categoryList.querySelectorAll(
    '.filter-panel__category-input, .filter-panel__category-radio'
  );
  const headerCountSpan = categoryList.querySelector('.header-count');

  inputs.forEach(function (input) {
    input.addEventListener('change', function () {
      const checkedCount = categoryList.querySelectorAll(
        '.filter-panel__category-input:checked, .filter-panel__category-radio:checked'
      ).length;
      headerCountSpan.textContent = checkedCount;
    });
  });
});
