import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="page">
        <Link to="/" className="footer_logo">
          conduit
        </Link>
        <span className="footer_text">
          An interactive learning project from{' '}
          <a className="text-[#5cb85c] " href="https://thinkster.io">
            Thinkster
          </a>
          . Code & design licensed under MIT.
        </span>
      </div>
    </footer>
  );
}
