// const container = document.getElementById('accordion');

// apiResult.forEach((result, idx) => {
//     // Create card element
//     const card = document.createElement('div');
//     card.classList = 'card-body';
  
//     // Construct card content
//     const content = `
//       <div class="card">
//       <div class="card-header" id="heading-${idx}">
//         <h5 class="mb-0">
//           <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-${idx}" aria-expanded="true" aria-controls="collapse-${idx}">//
// 
// test change
//                   </button>
//         </h5>
//       </div>
  
//       <div id="collapse-${idx}" class="collapse show" aria-labelledby="heading-${idx}" data-parent="#accordion">
//         <div class="card-body">
  
//           <h5>${result.title}</h5>
//           <p>${result.description}</p>
//           <p>${result.output}</p>
//           ...
//         </div>
//       </div>
//     </div>
//     `;
  
//     // Append newyly created card element to the container
//     container.innerHTML += content;