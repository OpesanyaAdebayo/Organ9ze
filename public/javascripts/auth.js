$("#signupForm").submit(function(e) {

  $.post('/auth/signup', $("#signupForm").serialize(), (data) => {
    localStorage.setItem('token', data);
    console.log(localStorage.token);
    window.location.href = '/dashboard';
  });
  e.preventDefault();
});