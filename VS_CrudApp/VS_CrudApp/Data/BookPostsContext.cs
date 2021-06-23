using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VS_CrudApp.Models;

namespace VS_CrudApp.Data
{
    public class BookPostsContext : DbContext
    {
        public BookPostsContext (DbContextOptions<BookPostsContext> options)
            : base(options)
        {
        }

        public DbSet<VS_CrudApp.Models.BookPost> BookPost { get; set; }
    }
}
