package com.example.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.apache.poi.openxml4j.opc.internal.ContentType;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security
            .authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static java.util.Collections.emptyList;

import java.io.IOException;

class TokenAuthenticationService {
    static final long EXPIRATIONTIME = 864_000_000; // 10 days
    static final String SECRET = "ThisIsASecret";
    static final String TOKEN_PREFIX = "Bearer";
    static final String HEADER_STRING = "Authorization";

    static void addAuthentication(HttpServletResponse res, String username) throws IOException {
        String JWT = Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
        System.out.println("Token Created: "+TOKEN_PREFIX + " " + JWT);
        res.addHeader(HEADER_STRING, TOKEN_PREFIX + " " + JWT);
        res.addHeader("Content-Type","application/json");
        res.addHeader("Access-Control-Allow-Origin","*");
        res.addHeader("Access-Control-Allow-Headers","*");
        res.setStatus(HttpServletResponse.SC_OK); 
        //res.getWriter().write("{\"Authorization\":\""+TOKEN_PREFIX + " " + JWT+"\"}");
        res.getWriter().write("{"
        						+ "\"access_token\":\"" + JWT+"\","
        						+ "\"user\":{"
        									  +"\"token\":\"" + JWT+"\","
        									  +"\"isAuthenticated\": true"
        								 + "}"
        						+ "}");
        
        
        res.getWriter().flush();
        res.getWriter().close();
    }

    static Authentication getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);
        if (token != null) {
            // parse the token.
            String user = Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                    .getBody()
                    .getSubject();

            return user != null ?
                    new UsernamePasswordAuthenticationToken(user, null, emptyList()) :
                    null;
        }
        return null;
    }
}