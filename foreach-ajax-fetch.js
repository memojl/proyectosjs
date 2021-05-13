//Javascript app_style_var.js
const url_css='http://localhost/MisSitios/phponixdev/api/v1/?tabla=css2';

const getcss2 = () => {
	fetch(url_css).then(res=>res.json()).then(data=>{//console.log(data);
		let tr = '';
		data.forEach(datos => {//console.log(datos);
			const {ID,nom,contenido,visible} = datos;
			if(visible==1){
				tr += `
				<div class="form-group">
					  <label for="${nom}">${ID}. ${nom}</label>
					  <input type="text" class="form-control" id="${nom}" name="${nom}" value="${contenido}" autocomplete="off">
				</div>`;
			}
		});
		$('#app-form').html(tr);
    })
    .catch(err=>console.log(err));
}

getcss2();

/*
$(document).ready(function(){
	registros();
	
	function registros(){
		$.ajax({
			type: 'GET',
			url: 'http://localhost/MisSitios/phponixdev/api/v1/?tabla=css2',
			success: function(data) {
				//console.table(data);
				let tr = '';
				/*
                for(i=0;i<data.length;i++){
                    const {ID,nom,contenido,visible} = data[i];
                    console.log(data[i]);
                    if(visible==1){
                        tr += `
                        <div class="form-group">
                  		    <label for="${nom}">${ID}. ${nom}</label>
                  		    <input type="text" class="form-control" id="${nom}" name="${nom}" value="${contenido}" autocomplete="off">
                	    </div>`;
                    }
				}
				data.forEach(datos => {//console.log(datos);
					const {ID,nom,contenido,visible} = datos;
					if(visible==1){
                        tr += `
                        <div class="form-group">
                  		    <label for="${nom}">${ID}. ${nom}</label>
                  		    <input type="text" class="form-control" id="${nom}" name="${nom}" value="${contenido}" autocomplete="off">
                	    </div>`;
                    }
				});
				$('#app-form').html(tr);
	   		}
		});
	}
	//setInterval(registros, 5000);
})

*/