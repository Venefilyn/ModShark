using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using System.Text;

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
            set => _hashedUsername = HashUsername(value);
        }

        public List<UserSetting> UserSettings { get; set; }

        public static string HashUsername(string value)
        {
            SHA512 shaM = new SHA512Managed();
            byte[] result = shaM.ComputeHash(Encoding.ASCII.GetBytes(value));
            return Encoding.ASCII.GetString(result);
        }
    }
}