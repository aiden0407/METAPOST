
function ButtonChange() {

    const alignLeft = document.querySelector('.ql-align');
    if (alignLeft) {
    alignLeft.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1307_39838)">
        <path d="M12.5 12.5H2.5V14.1667H12.5V12.5ZM12.5 5.83333H2.5V7.5H12.5V5.83333ZM2.5 10.8333H17.5V9.16667H2.5V10.8333ZM2.5 17.5H17.5V15.8333H2.5V17.5ZM2.5 2.5V4.16667H17.5V2.5H2.5Z" fill="#8C8C8C"/>
        </g>
        <defs>
        <clipPath id="clip0_1307_39838">
        <rect width="20" height="20" fill="white"/>
        </clipPath>
        </defs>
        </svg>`;
    }
    const alignLeftColor = document.querySelector('.ql-align.ql-active');
    if (alignLeftColor) {
    alignLeftColor.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1185_2219)">
        <path d="M12.5 12.5H2.5V14.1667H12.5V12.5ZM12.5 5.83333H2.5V7.5H12.5V5.83333ZM2.5 10.8333H17.5V9.16667H2.5V10.8333ZM2.5 17.5H17.5V15.8333H2.5V17.5ZM2.5 2.5V4.16667H17.5V2.5H2.5Z" fill="#2081E2"/>
        </g>
        <defs>
        <clipPath id="clip0_1185_2219">
        <rect width="20" height="20" fill="white"/>
        </clipPath>
        </defs>
        </svg>`;
    }

    const alignCenter = document.querySelector('button.ql-align[value="center"]');
    if (alignCenter) {
    alignCenter.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1185_2223)">
        <path d="M5.83333 12.5V14.1667H14.1667V12.5H5.83333ZM2.5 17.5H17.5V15.8333H2.5V17.5ZM2.5 10.8333H17.5V9.16667H2.5V10.8333ZM5.83333 5.83333V7.5H14.1667V5.83333H5.83333ZM2.5 2.5V4.16667H17.5V2.5H2.5Z" fill="#8C8C8C"/>
        </g>
        <defs>
        <clipPath id="clip0_1185_2223">
        <rect width="20" height="20" fill="white"/>
        </clipPath>
        </defs>
        </svg>`;
    }
    const alignCenterColor = document.querySelector('button.ql-align.ql-active[value="center"]');
    if (alignCenterColor) {
    alignCenterColor.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1307_39834)">
        <path d="M5.83333 12.5V14.1667H14.1667V12.5H5.83333ZM2.5 17.5H17.5V15.8333H2.5V17.5ZM2.5 10.8333H17.5V9.16667H2.5V10.8333ZM5.83333 5.83333V7.5H14.1667V5.83333H5.83333ZM2.5 2.5V4.16667H17.5V2.5H2.5Z" fill="#2081E2"/>
        </g>
        <defs>
        <clipPath id="clip0_1307_39834">
        <rect width="20" height="20" fill="white"/>
        </clipPath>
        </defs>
        </svg>`;
    }

    const alignRight = document.querySelector('button.ql-align[value="right"]');
    if (alignRight) {
    alignRight.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1307_39755)">
        <path d="M2.5 17.5H17.5V15.8333H2.5V17.5ZM7.5 14.1667H17.5V12.5H7.5V14.1667ZM2.5 10.8333H17.5V9.16667H2.5V10.8333ZM7.5 7.5H17.5V5.83333H7.5V7.5ZM2.5 2.5V4.16667H17.5V2.5H2.5Z" fill="#8C8C8C"/>
        </g>
        <defs>
        <clipPath id="clip0_1307_39755">
        <rect width="20" height="20" fill="white"/>
        </clipPath>
        </defs>
        </svg>`;
    }
    const alignRightColor = document.querySelector('button.ql-align.ql-active[value="right"]');
    if (alignRightColor) {
    alignRightColor.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1307_39810)">
        <path d="M2.5 17.5H17.5V15.8333H2.5V17.5ZM7.5 14.1667H17.5V12.5H7.5V14.1667ZM2.5 10.8333H17.5V9.16667H2.5V10.8333ZM7.5 7.5H17.5V5.83333H7.5V7.5ZM2.5 2.5V4.16667H17.5V2.5H2.5Z" fill="#2081E2"/>
        </g>
        <defs>
        <clipPath id="clip0_1307_39810">
        <rect width="20" height="20" fill="white"/>
        </clipPath>
        </defs>
        </svg>`;
    }

    const image = document.querySelector('button.ql-image');
    if (image) {
    image.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.8333 4.16667V15.8333H4.16667V4.16667H15.8333ZM15.8333 2.5H4.16667C3.25 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.25 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V4.16667C17.5 3.25 16.75 2.5 15.8333 2.5ZM11.7833 9.88333L9.28333 13.1083L7.5 10.95L5 14.1667H15L11.7833 9.88333Z" fill="#8C8C8C"/>
        </svg>`;
    }

    const youtube = document.querySelector('button.ql-video');
    if (youtube) {
    youtube.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.3812 5.7875C18.2816 5.41753 18.0866 5.08019 17.8157 4.80927C17.5448 4.53835 17.2075 4.34334 16.8375 4.24375C15.475 3.875 9.99998 3.875 9.99998 3.875C9.99998 3.875 4.52498 3.875 3.16248 4.24375C2.79251 4.34334 2.45518 4.53835 2.18425 4.80927C1.91333 5.08019 1.71832 5.41753 1.61873 5.7875C1.36432 7.17704 1.24087 8.58739 1.24998 10C1.24087 11.4126 1.36432 12.823 1.61873 14.2125C1.71832 14.5825 1.91333 14.9198 2.18425 15.1907C2.45518 15.4616 2.79251 15.6567 3.16248 15.7562C4.52498 16.125 9.99998 16.125 9.99998 16.125C9.99998 16.125 15.475 16.125 16.8375 15.7562C17.2075 15.6567 17.5448 15.4616 17.8157 15.1907C18.0866 14.9198 18.2816 14.5825 18.3812 14.2125C18.6356 12.823 18.7591 11.4126 18.75 10C18.7591 8.58739 18.6356 7.17704 18.3812 5.7875ZM8.24998 12.625V7.375L12.7937 10L8.24998 12.625Z" fill="#8C8C8C"/>
        </svg>`;
    }

    const emoji = document.querySelector('button.ql-emoji');
    if (emoji) {
    emoji.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.9165 9.1665C13.6069 9.1665 14.1665 8.60686 14.1665 7.9165C14.1665 7.22615 13.6069 6.6665 12.9165 6.6665C12.2261 6.6665 11.6665 7.22615 11.6665 7.9165C11.6665 8.60686 12.2261 9.1665 12.9165 9.1665Z" fill="#8C8C8C"/>
        <path d="M7.0835 9.1665C7.77385 9.1665 8.3335 8.60686 8.3335 7.9165C8.3335 7.22615 7.77385 6.6665 7.0835 6.6665C6.39314 6.6665 5.8335 7.22615 5.8335 7.9165C5.8335 8.60686 6.39314 9.1665 7.0835 9.1665Z" fill="#8C8C8C"/>
        <path d="M10.0002 14.9998C11.9002 14.9998 13.5168 13.6165 14.1668 11.6665H5.8335C6.4835 13.6165 8.10016 14.9998 10.0002 14.9998Z" fill="#8C8C8C"/>
        <path d="M9.9915 1.6665C5.3915 1.6665 1.6665 5.39984 1.6665 9.99984C1.6665 14.5998 5.3915 18.3332 9.9915 18.3332C14.5998 18.3332 18.3332 14.5998 18.3332 9.99984C18.3332 5.39984 14.5998 1.6665 9.9915 1.6665ZM9.99984 16.6665C6.3165 16.6665 3.33317 13.6832 3.33317 9.99984C3.33317 6.3165 6.3165 3.33317 9.99984 3.33317C13.6832 3.33317 16.6665 6.3165 16.6665 9.99984C16.6665 13.6832 13.6832 16.6665 9.99984 16.6665Z" fill="#8C8C8C"/>
        </svg>`;
    }
}

export default ButtonChange;