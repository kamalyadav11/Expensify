import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    404! 
    Page Not Found. <Link to="/">Go to Home Page</Link>
  </div>
);//Link make use of client side routing and we don't have to go through a full page refresh.

export default NotFoundPage;