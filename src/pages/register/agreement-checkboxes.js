export const setupAgreementCheckboxes = () => {
  const agreeAllCheckbox = document.getElementById('agreeAll');
  const requiredCheckboxes = [
    document.getElementById('terms'),
    document.getElementById('privacy'),
    document.getElementById('age'),
    document.getElementById('promotion'),
  ];

  agreeAllCheckbox.addEventListener('click', () => {
    requiredCheckboxes.forEach((checkbox) => (checkbox.checked = agreeAllCheckbox.checked));
  });

  requiredCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      agreeAllCheckbox.checked = requiredCheckboxes.every((cb) => cb.checked);
    });
  });
};
