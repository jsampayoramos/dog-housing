import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faPlusSquare, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

export const iconLibrary = () => library.add(fab, faSearch, faPlusSquare, faMapMarkerAlt, faStar);
