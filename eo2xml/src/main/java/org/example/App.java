package org.example;

import com.jcabi.xml.XMLDocument;
import com.jcabi.xml.XML;
import com.yegor256.xsline.Xsline;
import org.eolang.parser.ParsingTrain;
import org.eolang.parser.Syntax;
import org.cactoos.io.InputOf;
import org.cactoos.io.OutputTo;

import java.io.ByteArrayOutputStream;
import java.util.Scanner;
import java.io.IOException;
import java.nio.file.Paths;


public class App {
    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
        StringBuilder sb = new StringBuilder();
        while (scanner.hasNextLine()) {
            sb.append(scanner.nextLine());
            sb.append(System.lineSeparator());
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        new Syntax(
                "foo",
                new InputOf(sb.toString()),
                new OutputTo(baos)
        ).parse();

        XML xmir = new XMLDocument(baos.toByteArray());
        XML after = new Xsline(new ParsingTrain()).pass(xmir);

        System.out.println(after.toString());
    }
}
