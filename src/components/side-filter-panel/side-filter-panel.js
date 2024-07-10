import './side-filter-panel.scss';

document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.category-toggle');

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      const item = this.parentElement;
      const isActive = item.classList.contains('category-header--active');

      if (isActive) {
        item.classList.remove('category-header--active');
        this.classList.remove('active');
      } else {
        item.classList.add('category-header--active');
        this.classList.add('active');
      }
    });
  });
});
