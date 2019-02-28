using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ModShark.Models
{
    public class RedditUser
    {
        private string _hashedUsername;
        
        public int Id { get; set; }

        [Required]
        public string Username
        {
            get => _hashedUsername;
            set => _hashedUsername = value + "abc";
        }

        public List<UserSetting> UserSettings { get; set; }
    }
}