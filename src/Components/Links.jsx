import React from 'react'
import { NavLink } from 'react-router-dom'
const links = [
    { key: 1, url: '/search', text: '🔎 All' },
    { key: 2,url: '/news', text: '📰 News' },
    { key: 3,url: '/images', text: '📸 Images' },
    {key: 4, url: '/videos', text: '📺 Videos' },
  ];
const Links = () => {
    return (
        <div className="flex sm:justify-around justify-between items-center mt-4">
        {links.map(({ url, text,key }) => (
          <NavLink to={url} key={key}className='m-2 mb-0' activeClassName="text-blue-700 border-b-2 dark:text-blue-300 border-blue-700 pb-2">{text}</NavLink>
        ))}
      </div>
    )
}

export default Links
