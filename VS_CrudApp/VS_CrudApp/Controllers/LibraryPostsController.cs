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

    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryPostsController : ControllerBase
    {
        private readonly BookPostsContext _context;
        private readonly IDataRepository<LibraryPost> _repo;

        public LibraryPostsController(BookPostsContext context, IDataRepository<LibraryPost> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/LibraryPosts
        [HttpGet]
        public IEnumerable<LibraryPost> GetLibraryPosts()
        {
            return _context.LibraryPosts.OrderByDescending(p => p.LibId);
        }

        // GET: api/LibraryPosts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLibraryPost([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var libraryPost = await _context.LibraryPosts.FindAsync(id);

            if (libraryPost == null)
            {
                return NotFound();
            }

            return Ok(libraryPost);
        }

        // PUT: api/LibraryPosts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLibraryPost([FromRoute] int id, [FromBody] LibraryPost libraryPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != libraryPost.LibId)
            {
                return BadRequest();
            }

            _context.Entry(libraryPost).State = EntityState.Modified;

            try
            {
                _repo.Update(libraryPost);
                var save = await _repo.SaveAsync(libraryPost);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LibraryPostExists(id))
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

        // POST: api/LibraryPosts
        [HttpPost]
        public async Task<IActionResult> PostLibraryPost([FromBody] LibraryPost libraryPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(libraryPost);
            var save = await _repo.SaveAsync(libraryPost);

            return CreatedAtAction("GetLibraryPost", new { id = libraryPost.LibId }, libraryPost);
        }

        // DELETE: api/LibraryPosts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLibraryPost([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var libraryPost = await _context.LibraryPosts.FindAsync(id);
            if (libraryPost == null)
            {
                return NotFound();
            }

            _repo.Delete(libraryPost);
            var save = await _repo.SaveAsync(libraryPost);

            return Ok(libraryPost);
        }

        private bool LibraryPostExists(int id)
        {
            return _context.LibraryPosts.Any(e => e.LibId == id);
        }
    }
}
