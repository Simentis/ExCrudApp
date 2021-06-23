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
public class BookPostsController : ControllerBase
{
    private readonly BookPostsContext _context;
    private readonly IDataRepository<BookPost> _repo;

    public BookPostsController(BookPostsContext context, IDataRepository<BookPost> repo)
    {
        _context = context;
        _repo = repo;
    }

    // GET: api/BookPosts
    [HttpGet]
    public IEnumerable<BookPost> GetBookPosts()
    {
        return _context.BookPosts.OrderByDescending(p => p.PostId);
    }

    // GET: api/BookPosts/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetBookPost([FromRoute] int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var bookPost = await _context.BookPosts.FindAsync(id);

        if (bookPost == null)
        {
            return NotFound();
        }

        return Ok(bookPost);
    }

    // PUT: api/BookPosts/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutBookPost([FromRoute] int id, [FromBody] BookPost bookPost)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (id != bookPost.PostId)
        {
            return BadRequest();
        }

        _context.Entry(bookPost).State = EntityState.Modified;

        try
        {
            _repo.Update(bookPost);
            var save = await _repo.SaveAsync(bookPost);
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
    [HttpPost]
    public async Task<IActionResult> PostBookPost([FromBody] BookPost bookPost)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _repo.Add(bookPost);
        var save = await _repo.SaveAsync(bookPost);

        return CreatedAtAction("GetBookPost", new { id = bookPost.PostId }, bookPost);
    }

    // DELETE: api/BookPosts/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBookPost([FromRoute] int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var bookPost = await _context.BookPosts.FindAsync(id);
        if (bookPost == null)
        {
            return NotFound();
        }

        _repo.Delete(bookPost);
        var save = await _repo.SaveAsync(bookPost);

        return Ok(bookPost);
    }

    private bool BookPostExists(int id)
    {
        return _context.BookPosts.Any(e => e.PostId == id);
    }
}
}
