import {storage} from '@core/utils';
function toHTML(key) {
  const model = storage(key);
  // console.log(model);

  return ` 
     <li class="db__table-list-record">
            <a href="#excel/${key.split(':')[1]}">${model.title}</a>
            <strong>
            ${new Date(model.openDate).toLocaleDateString()}
            ${new Date(model.openDate).toLocaleTimeString()}
            </strong>
    </li>`;
}
function getAllKeys() {
  const keys =[];
  for (let i=0; i < localStorage.length; i++) {
    const key= localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }
  return keys;
}

export function createRecordsTable() {
  const keys =getAllKeys();

  if (!keys.length) {
    return `
    <div class="db__table-header">
      <span>You haven't created any tables yet</span>      
  </div>  
`;
  } else {
    return `
        <div class="db__table-header">
          <span>Name</span>
          <span>Date</span>
      </div>
        <ul class="db__table-list">
          ${keys.map(key =>toHTML(key)).join('')}
        </ul>

  `;
  }
}


