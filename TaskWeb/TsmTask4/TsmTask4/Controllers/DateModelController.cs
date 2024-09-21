using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TsmTask4.Data;
using TsmTask4.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TsmTask4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DateModelController : ControllerBase
    {
        private readonly ActivityDbContext _context;

        public DateModelController(ActivityDbContext context)
        {
            _context = context;
        }
        // GET: api/<DateController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DateModel>>> Get()
        {
            var dateModels = await _context.DateModels
    .Include(d => d.Activities)
    .ToListAsync();

            return dateModels;
        }

        // GET api/<DateController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DateModel>> Get(int id)
        {
            var dateModel = await _context.DateModels
            .Include(d => d.Activities)
            .FirstOrDefaultAsync(d => d.DateId == id);

            if (dateModel == null)
            {
                return NotFound();
            }

            return dateModel;
        }

        // POST api/<DateController>
        [HttpPost]
        public async Task<ActionResult<DateModel>> Post( DateModel dateModel)
        {
            _context.DateModels.Add(dateModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = dateModel.DateId }, dateModel);
        }



        // DELETE api/<DateController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)

        {
            var dateModel = await _context.DateModels.FindAsync(id);
            if (dateModel == null)
            {
                return NotFound();
            }

            _context.DateModels.Remove(dateModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
