using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VS_CrudApp.Data;
using VS_CrudApp.Models;

namespace VS_CrudApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookPostsController : ControllerBase
    {
        private readonly VS_BookPostsContext _context;

        public BookPostsController(VS_BookPostsContext context)
        {
            _context = context;
        }

        // GET: api/BookPosts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookPost>>> GetBookPost()
        {
            return await _context.BookPost.ToListAsync();
        }

        // GET: api/BookPosts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookPost>> GetBookPost(int id)
        {
            var bookPost = await _context.BookPost.FindAsync(id);

            if (bookPost == null)
            {
                return NotFound();
            }

            return bookPost;
        }

        // PUT: api/BookPosts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookPost(int id, BookPost bookPost)
        {
            if (id != bookPost.PostId)
            {
                return BadRequest();
            }

            _context.Entry(bookPost).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookPostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BookPosts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<BookPost>> PostBookPost(BookPost bookPost)
        {
            _context.BookPost.Add(bookPost);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBookPost", new { id = bookPost.PostId }, bookPost);
        }

        // DELETE: api/BookPosts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BookPost>> DeleteBookPost(int id)
        {
            var bookPost = await _context.BookPost.FindAsync(id);
            if (bookPost == null)
            {
                return NotFound();
            }

            _context.BookPost.Remove(bookPost);
            await _context.SaveChangesAsync();

            return bookPost;
        }

        private bool BookPostExists(int id)
        {
            return _context.BookPost.Any(e => e.PostId == id);
        }
    }
}
