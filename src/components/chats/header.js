import React from 'react';

function Header({selectedChatId,handleClose,name}) {

    return (
        <div className='header-details'>
        <i className='fa fa-close' onClick={handleClose}/>   {name} 
        </div>
    );
}

export default Header;