
class Decryptor:

    def shift_letter(self, letter):
        return chr( (ord('a') + ord('z')) - ord(letter))  # shift ascii character to backwards from the sum of ascii values of "a" and "z

    def decrypt_message(self, encrypted_message):
        decrypted_message = ""
        for letter in encrypted_message:
            if letter.isupper():
                decrypted_message += letter
            else:
                if letter.isalpha():
                    decrypted_message += self.shift_letter(letter)
                else:
                    decrypted_message += letter

        return decrypted_message

message = "Povzhv hvmw z nvhhztv drgs xfiivmg hvhhrlm rm qhlm ulinzg erz gsrh vcznkov : {\"gbkv\":\"REGISTER\",\"mznv\":\"blfi mznv\",\"hfimznv\":\"blfi hfimznv\",\"vnzro\":\"blfi vnzro zwwivhh\",\"ivtrhgizgrlmKvb\":\"ccc\"}. Kvvk orhgvmrmt mvd nvhhztv uli gzhp xlmgvmg! Ylfi ivtrhgizgrlmKvb : xxxx"
decryptor = Decryptor()
print(decryptor.decrypt_message(message))