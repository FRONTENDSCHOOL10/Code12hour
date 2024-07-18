export const setupAgreementCheckboxes = () => {
  const agreeAllCheckbox = document.getElementById('agreeAll');
  const requiredCheckboxes = [
    document.getElementById('terms'),
    document.getElementById('privacy'),
    document.getElementById('age'),
    document.getElementById('promotion'),
  ];

  const handleAgreeAllClick = () => {
    requiredCheckboxes.forEach((checkbox) => (checkbox.checked = agreeAllCheckbox.checked));
  };

  const handleCheckboxChange = () => {
    agreeAllCheckbox.checked = requiredCheckboxes.every((checkbox) => checkbox.checked);
  };

  agreeAllCheckbox.addEventListener('click', handleAgreeAllClick);

  requiredCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange);
  });
};
