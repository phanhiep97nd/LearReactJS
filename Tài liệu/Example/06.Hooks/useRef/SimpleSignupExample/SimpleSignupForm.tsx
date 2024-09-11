import { useRef, useEffect } from 'react';
import styles from './FormStyles.module.css';

/**
 * Component này thực hiện đăng ký tài khoản. Các đối tượng sử dụng là jsx element, không quản lý bởi React (không re-render)
 * Sử dụng hoàn toàn useRef dành cho việc lấy dữ liệu từ DOM element
 */
const SimpleSignupForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const rewritePasswordRef = useRef<HTMLInputElement>(null);
  const emailErrorRef = useRef<HTMLDivElement>(null);
  const passwordErrorRef = useRef<HTMLDivElement>(null);
  const rewritePasswordErrorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
		if (emailRef.current) {
		  emailRef.current.focus(); // Focus vào hạng mục email khi khởi tạo ban đầu
		}
  }, []);

  // Action khi submit: validate dữ liệu trước khi gọi đến backend
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const emailValue = emailRef.current?.value;
		const passwordValue = passwordRef.current?.value;
		const rewritePasswordValue = rewritePasswordRef.current?.value;

		let hasError = false;

		if (emailErrorRef.current) emailErrorRef.current.textContent = '';
		if (passwordErrorRef.current) passwordErrorRef.current.textContent = '';
		if (rewritePasswordErrorRef.current) rewritePasswordErrorRef.current.textContent = '';

		if (!emailValue) {
		  if (emailErrorRef.current) emailErrorRef.current.textContent = 'Hãy nhập email hoặc username';
		  hasError = true;
		} else if (!/^[a-zA-Z0-9]+$/.test(emailValue)) {
		  if (emailErrorRef.current) emailErrorRef.current.textContent = 'Không nhập ký tự đặc biệt vào email hoặc username';
		  hasError = true;
		}

		if (!passwordValue) {
		  if (passwordErrorRef.current) passwordErrorRef.current.textContent = 'Hãy nhập password';
		  hasError = true;
		}

		if (!rewritePasswordValue) {
		  if (rewritePasswordErrorRef.current) rewritePasswordErrorRef.current.textContent = 'Hãy nhập lại password';
		  hasError = true;
		} else if (passwordValue !== rewritePasswordValue) {
		  if (rewritePasswordErrorRef.current) rewritePasswordErrorRef.current.textContent = 'Mật khẩu và nhập lại mật khẩu không khớp';
		  hasError = true;
		}

		if (hasError) {
		  alert('Có lỗi khi đăng ký tài khoản');
		  return;
		}

		// Action thao tác với phía backend
		alert('Đăng ký thành công!');
  };

  return (
		<form id='signupForm' onSubmit={handleSubmit} className={styles.form}>
		  <div className={styles.rowNormal}>
				<label htmlFor='emailUserName'>Email hoặc Username</label>
				<input type='text' id='emailUserName' ref={emailRef} placeholder="Nhập email hoặc username" />
				<div ref={emailErrorRef} className={styles.error}></div>
		  </div>
		  <div className={styles.rowNormal}>
				<label htmlFor='password'>Password</label>
				<input type='password' id='password' ref={passwordRef} placeholder="Nhập password" />
				<div ref={passwordErrorRef} className={styles.error}></div>
		  </div>
		  <div className={styles.rowNormal}>
				<label htmlFor='rewritePassword'>Nhập lại password</label>
				<input type='password' id='rewritePassword' ref={rewritePasswordRef} placeholder="Nhập lại password" />
				<div ref={rewritePasswordErrorRef} className={styles.error}></div>
		  </div>
		  <input type='submit' value='Đăng ký' />
		</form>
  );
}

export default SimpleSignupForm;
