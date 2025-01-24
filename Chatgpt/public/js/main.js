$(document).ready(function() {
    // Funciones para Usuarios
    $('.edit-usuario').click(function() {
        const row = $(this).closest('tr');
        row.find('.usuario-info').addClass('d-none');
        row.find('.usuario-edit').removeClass('d-none');
        $(this).addClass('d-none');
        row.find('.save-usuario').removeClass('d-none');
    });

    $('.save-usuario').click(function() {
        const row = $(this).closest('tr');
        const id = $(this).data('id');
        const nombre = row.find('.usuario-edit').eq(0).val();
        const apellido = row.find('.usuario-edit').eq(1).val();
        const email = row.find('.usuario-edit').eq(2).val();
        const telefono = row.find('.usuario-edit').eq(3).val();
        const fechaNacimiento = row.find('.usuario-edit').eq(4).val();

        $.ajax({
            url: `/usuarios/${id}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ 
                nombre, 
                apellido, 
                email, 
                telefono, 
                fechaNacimiento 
            }),
            success: function() {
                row.find('.usuario-info').eq(0).text(nombre);
                row.find('.usuario-info').eq(1).text(apellido);
                row.find('.usuario-info').eq(2).text(email);
                row.find('.usuario-info').eq(3).text(telefono);
                row.find('.usuario-info').eq(4).text(new Date(fechaNacimiento).toLocaleDateString());
                row.find('.usuario-info').removeClass('d-none');
                row.find('.usuario-edit').addClass('d-none');
                row.find('.save-usuario').addClass('d-none');
                row.find('.edit-usuario').removeClass('d-none');
            },
            error: function() {
                alert('Error al actualizar el usuario');
            }
        });
    });

    $('.delete-usuario').click(function() {
        if (!confirm('¿Está seguro de eliminar este usuario?')) return;
        
        const row = $(this).closest('tr');
        const id = $(this).data('id');

        $.ajax({
            url: `/usuarios/${id}`,
            method: 'DELETE',
            success: function() {
                row.remove();
            },
            error: function() {
                alert('Error al eliminar el usuario');
            }
        });
    });

    // Funciones para Cursos
    $('.edit-curso').click(function() {
        const row = $(this).closest('tr');
        row.find('.curso-info').addClass('d-none');
        row.find('.curso-edit').removeClass('d-none');
        $(this).addClass('d-none');
        row.find('.save-curso').removeClass('d-none');
    });

    $('.save-curso').click(function() {
        const row = $(this).closest('tr');
        const id = $(this).data('id');
        const nombre = row.find('.curso-edit').eq(0).val();
        const descripcion = row.find('.curso-edit').eq(1).val();
        const creditos = parseInt(row.find('.curso-edit').eq(2).val());

        $.ajax({
            url: `/cursos/${id}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ 
                nombre, 
                descripcion, 
                creditos 
            }),
            success: function() {
                row.find('.curso-info').eq(0).text(nombre);
                row.find('.curso-info').eq(1).text(descripcion);
                row.find('.curso-info').eq(2).text(creditos);
                row.find('.curso-info').removeClass('d-none');
                row.find('.curso-edit').addClass('d-none');
                row.find('.save-curso').addClass('d-none');
                row.find('.edit-curso').removeClass('d-none');
            },
            error: function() {
                alert('Error al actualizar el curso');
            }
        });
    });

    $('.delete-curso').click(function() {
        if (!confirm('¿Está seguro de eliminar este curso?')) return;
        
        const row = $(this).closest('tr');
        const id = $(this).data('id');

        $.ajax({
            url: `/cursos/${id}`,
            method: 'DELETE',
            success: function() {
                row.remove();
            },
            error: function() {
                alert('Error al eliminar el curso');
            }
        });
    });
}); 