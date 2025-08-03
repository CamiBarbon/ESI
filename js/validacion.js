window.addEventListener('DOMContentLoaded', () => {
  let form = document.getElementById('contact-form');
  let pristine = new Pristine(form);

  form.addEventListener('submit', (e) => {
    if (!pristine.validate()) {
      e.preventDefault();
    }
  });
});