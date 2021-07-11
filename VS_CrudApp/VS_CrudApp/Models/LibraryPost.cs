using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VS_CrudApp.Models
{
    public class LibraryPost
    {
        [Key]
        public int LibId { get; set; }

        [Required]
        public string Adress { get; set; }

        [Required]
        public string Title { get; set; }




    }
}
