var provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(function(){
    auth.signInWithPopup(provider).then(function(result){
        console.log(result.user);
        guardarDatos(result.user);
        //leerDatos();
        $('#login').hide();
        $('#root').append("Usuario Conectado<br><img src='"+result.user.photoURL+"' width='30'><br>Nombre: "+result.user.displayName+"<hr>");
        leerDatos();

    });
        
});

//Leer los datos
function leerDatos(){
db.ref("usuarios").on("child_added",function(s){
    var user=s.val();
    $('#root').append("Usuario Registrado<br><img src='"+user.foto+"' width='30'><br>Nombre: "+user.usuario+"<br>");
});
}
//Guardar automaticamente
function guardarDatos(user){
    var usuario = {
        uid: user.uid,
        usuario: user.displayName,
        email: user.email,
        foto: user.photoURL
    }
    db.ref('usuarios/'+user.uid).set(usuario);
} 

//Guardar
$("#guardar").click(function(){

    db.ref('usuarios').set({
        nombre: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL
    });

});