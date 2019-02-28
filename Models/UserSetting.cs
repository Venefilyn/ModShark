using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ModShark.Models
{
    public class UserSetting
    {
        public int Id { get; set; }
        
        [Required]
        public int RedditUserId { get; set; }
        
        public RedditUser RedditUser { get; set; }
        
        [Required]
        public int SettingsProfileId { get; set; }

        [Required]
        public string SettingsProfileName { get; set; }
        
        [Required]
        [Column(TypeName = "text")]
        // JSON format
        public string Settings { get; set; }
    }
}