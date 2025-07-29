window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const pristine = new Pristine(form);

  form.addEventListener('submit', (e) => {
    if (!pristine.validate()) {
      e.preventDefault();
    }
  });
});